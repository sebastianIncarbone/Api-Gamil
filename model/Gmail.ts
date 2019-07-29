import * as fs from 'fs';
import * as dotenv from "dotenv";
import { ErrorNotificator } from './ErrorNotificator';
import { gmail_v1, google } from 'googleapis';
import Gmail = gmail_v1.Gmail;

dotenv.config();

export class GCredentials {
    public params:any;
    public token: any;

    constructor() {
        const cretetiansPath = __dirname + process.env.CREDENTIALS_PATH;
        const credentials: string = fs.readFileSync(cretetiansPath).toString();

        this.params = JSON.parse(credentials).installed;
    }

    public install(): void {
        this.token = JSON.parse(GCredentials.getFileToken());
    }

    public makeNewToken(code: string): void {

        const oAuthClient = this.getOAuthClient();
        const tokenpath = __dirname + process.env.TOKEN_PATH;

        oAuthClient.getToken(code, (err, token) => {

            ErrorNotificator.error('Error retrieving access token ==>', err);

            oAuthClient.setCredentials(token);

            fs.writeFile(tokenpath, JSON.stringify(token), (err) => {
                ErrorNotificator.error('Error when writing token file ==>', err);
            });

        });
    }

    public getOAuthClient(): any {
        return new google.auth.OAuth2(
            this.params.client_id,
            this.params.client_secret,
            this.params.redirect_uris[0]
        );
    }

    private static getFileToken(): string {

        let tkfile: string = "";

        try {

            tkfile = fs.readFileSync(__dirname + process.env.TOKEN_PATH).toString();

        } catch (err) {

            ErrorNotificator.error('',err);

        }

        return tkfile;
    }
}

export class GAuth {

    public static async getAuth(): Promise<Gmail> {
        const gcredentials = new GCredentials();

        gcredentials.install();

        const authClient = gcredentials.getOAuthClient();

        authClient.setCredentials(gcredentials.token);

        return google.gmail({version: 'v1', auth: authClient});
    }

}

import * as express from 'express';
import { GCredentials } from "../model/Gmail";
import * as dotenv from "dotenv";

dotenv.config();

interface Gcode {
    code:string;
}

export class AuthController {
    public path = '/auth';
    public router = express.Router();
    private gauth: GCredentials;

    constructor() {
        this.intializeRoutes();
        this.gauth = new GCredentials();
    }

    public intializeRoutes():void {
        this.router.get(this.path, this.returnLink);
        this.router.post(this.path, this.authenticate);
    }

    private setCode(code: string):void {
        this.gauth.makeNewToken(code);
    }

    private getLink(): string {
        return this.gauth.getOAuthClient().generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://mail.google.com/',
                'https://www.googleapis.com/auth/gmail.modify',
                'https://www.googleapis.com/auth/gmail.compose',
                'https://www.googleapis.com/auth/gmail.send'
            ]
        });
    }

    public authenticate = (request: express.Request, response: express.Response, next) => {
        const gcode: Gcode = request.body;

        this.setCode(gcode.code);

        response.send({ msg : "Singin Succesfull" }).status(200);
        next();
    };

    public returnLink = (request: express.Request, response: express.Response, next) => {
        response.send({
            url: this.getLink()
        })
        .status(200);

        next();
    };

}
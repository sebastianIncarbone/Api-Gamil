import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

export class Api {
    public api: express.Application;
    public port: string;

    constructor(controllers) {
        this.api = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.port = process.env.SERVER_PORT;
    }

    private initializeMiddlewares() {
        this.api.use(bodyParser.json());
        dotenv.config();
    }

    private initializeControllers(controllers) {

        controllers.forEach((controller) => {
            this.api.use('/', controller.router);
        });

        //this.api.on("error", (err) => { console.error(err); });
    }

    public listen() {
        this.api.listen(this.port, () => {
            console.log('Api listening on the port => ' + this.port );
        });
    }
}
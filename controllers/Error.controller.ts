import * as express from 'express';
import { ErrorNotificator } from "../model/ErrorNotificator";


export class ErrorController {
    public path = '/error';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes(): void {
        this.router.get(this.path, this.getAllErrors);
        this.router.get(this.path + '/lastError', this.lastError);
    }

    getAllErrors = (request: express.Request, response: express.Response, next) => {
        response.send(ErrorNotificator.getAllErr()).status(200);
        next();
    };

    lastError = (request: express.Request, response: express.Response, next) => {
        response.send(ErrorNotificator.getLast()).status(200);
        next();
    };

}
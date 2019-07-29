import * as express from 'express';
import { Mail,MailImp } from '../model/Mail';
import { GAuth } from "../model/Gmail";
import { MailValidator, ValidatorResult } from "../model/MailValidator";
import { ErrorNotificator } from "../model/ErrorNotificator";

let mailToSend:MailImp;

export class MailController {
    public path = '/mail';
    public router = express.Router();
    private gmail: any;
    private _mails: Array<Mail> = [];
    private mailValidator: MailValidator;
    private check: boolean;
    private msg: string;

    constructor() {
        this.intializeRoutes();
        this.gmail = GAuth.getAuth();
        this.mailValidator = new MailValidator();
    }

    public intializeRoutes(): void {
        this.router.get(this.path, this.getAllMails);
        this.router.get(this.path + '/labels', this.getLabels);
        this.router.post(this.path, this.sendMail);
    }

    private listLabels(): void {

        this.gmail
        .then((gmail) => {
            gmail.users.labels.list({ userId: 'me'}, (err, res) => {

                ErrorNotificator.error('The API returned an error: ', err);

                const labels = res.data.labels;

                if (labels.length) {

                    console.log('Labels:');

                    labels.forEach((label) => {
                        console.log(`- ${label.name}`);
                    });

                } else {
                    console.log('No labels found.');
                }
            });
        })
        .catch(err => ErrorNotificator.error("", err));

    }

    private sendEmail(): void {

        this.gmail
        .then((gmail) => {
            gmail.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: mailToSend.encoding()
                }
            }).then(() => console.log("====> sended <===="))
            .catch(err => ErrorNotificator.error("", err));
        })
        .catch(err => ErrorNotificator.error("", err));

    }

    private checkMails(validators: ValidatorResult): void {
        this.check = validators.state && this.check;

        if(!validators.state) {
            this.msg = validators.msg;
        }

    }

    getAllMails = (request: express.Request, response: express.Response, next) => {
        response.send(this._mails).status(200);
        next();
    };

    sendMail = async (request: express.Request, response: express.Response, next) => {
        const mail: Mail = request.body;
        this.check = true;

        this.mailValidator.validate(mail).map((validators) => this.checkMails(validators));

        if (this.check) {

            this._mails.push(mail);

            mailToSend = new MailImp(mail.from, mail.to, mail.subject, mail.body);

            this.sendEmail();

            response.status(200).send({mail: mail, msg: this.msg});
            next();

        } else {

            response.status(400).send({err: this.msg});
            next();

        }
    };

    getLabels = (request: express.Request, response: express.Response, next) => {
        this.listLabels();
        response.send("success!").status(200);
        next();
    };
}
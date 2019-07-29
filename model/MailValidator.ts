import { Mail } from "./Mail";

export interface ValidatorResult {
    state: boolean,
    msg: string
}

export class MailValidator {

    constructor() { }

    public validate(mail:Mail): Array<ValidatorResult> {
        return  [ this.contentFrom(mail.from), this.contentTo(mail.to), this.contentSubject(mail.subject) ];
    }

    private contentFrom(from: string): ValidatorResult {
        let state:boolean = from === null || from === "";
        let msg: string = "";

        if(state) {
            msg = "Who are you?";
            throw new Error(msg);
        }

        state = !state;

        return { state, msg};
    }

    private contentTo(to: string): ValidatorResult {
        let state:boolean = to === null || to === "";
        let msg: string = "";

        if(state) {
            msg = "Who are you send this mail?";
            throw new Error(msg);
        }

        state = !state;

        return { state, msg};
    }

    private contentSubject(subject: string): ValidatorResult {
        let state:boolean = subject === null || subject === "";
        let msg: string = "";

        if(state) {
            msg = "Pleace, write one subject, is so important!";
            throw new Error(msg);
        }

        state = !state;

        return { state, msg};
    }

}
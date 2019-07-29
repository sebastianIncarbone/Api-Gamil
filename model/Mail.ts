import {HexBase64BinaryEncoding} from "crypto";

export interface Mail {
    from: string;
    to: string;
    subject: string;
    body: string;
}

export class MailImp implements Mail {
    public from: string;
    public to: string;
    public subject: string;
    public body: string;
    private contentType: string = "text/html; charset=utf-8";

    constructor(from:string, to:string, subject:string, body:string) {
        this.from = from + '@google.com';
        this.to = to + '@google.com';
        this.subject = subject;
        this.body = body;
    }

    public encoding() {
        const messageParts:Array<string> = this.toArray();

        const message:string = messageParts.join('\r\n');

        return Buffer.from(message)
               .toString('base64')
               .replace(/\+/g, '-')
               .replace(/\//g, '_')
               .replace(/=+$/, '');
    }

    private toArray(): Array<string> {
        return [
            'From: ' + this.from + ' <'+ this.from + '>',
            'To: ' + this.to + ' <'+ this.to + '>',
            'Content-Type: ' + this.contentType,
            'MIME-Version: 1.0',
            'Subject: ' + this.subject,
            this.body
        ];
    }
}
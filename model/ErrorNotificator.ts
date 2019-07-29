export class ErrorNotificator {

    private static errList:Array<any> = new Array<any>();
    private static subscriptors: Array<string>;

    public static error(title:string ,err:any): void {
        if(err) {
            this.errList.push(err);
            console.error(title, err);
        }
    }

    public static getAllErr(): Array<any> {
        if(!(this.errList.length >= 0)) { return this.errList }
        return ["NO-ERRORS"];
    }

    public static getLast(): any {
        if(!(this.errList.length >= 0)) { return this.errList.pop() }
        return "NO-ERRORS";
    }

}
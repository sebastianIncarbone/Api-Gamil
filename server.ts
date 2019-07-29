import { Api } from './model/Api';
import { MailController } from './controllers/Mail.controller';
import { AuthController } from './controllers/Auth.controller';
import {ErrorController} from "./controllers/Error.controller";

let mailController = new MailController();
let authController = new AuthController();
let errorController = new ErrorController();

const controllers = [ mailController,authController,errorController ];
const service = new Api(controllers);

service.listen();
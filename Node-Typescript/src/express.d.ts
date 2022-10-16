import { userInterface } from "./interface/user.interface";

declare global{
    namespace Express {
        interface Request{
            user: userInterface
        }
    }
}
import { HTTPExceptions } from "./root";

export class UnauthorizedException extends HTTPExceptions{
    constructor(message:string,errorCode:number,errors?:any){
        super(message,errorCode,401,errors)
    }
    
}
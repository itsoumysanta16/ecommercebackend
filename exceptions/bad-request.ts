import {ErrorCodes, HTTPExceptions} from './root'

export class BadRequestsException extends HTTPExceptions{
    constructor(message:string,errorCode:ErrorCodes){
        super(message,errorCode,400,null);
    }
}
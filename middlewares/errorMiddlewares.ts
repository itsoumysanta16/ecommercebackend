import { NextFunction,Request,Response } from "express";
import { HTTPExceptions } from "../exceptions/root";

export const errorMiddleware=(error:HTTPExceptions,req:Request,res:Response,next:NextFunction)=>{
    res.status(error.statusCode).json({
        message:error.message,
        errorCode:error.errorCode,
        error:error.errors
    })
}
import prisma from '../DB/db-config';
import { NextFunction, Request,Response } from "express";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { BadRequestsException } from '../exceptions/bad-request';
import { ErrorCodes } from '../exceptions/root';
import { signUpschema } from '../schema/user';

dotenv.config({path:".env"});

const jwtsecret=process.env.JWT_SECRET|| "";


export const signupUser=async(req:Request,res:Response,next:NextFunction)=>{
    const {email,name,password}= req.body;
    signUpschema.parse(req.body);
    try{
        const existUser=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(existUser){
           next( new BadRequestsException('User already exists',ErrorCodes.USER_ALREADY_EXISTS));
        }
        const hashpassword=await bcrypt.hash(password,10);
        const newuser=await prisma.user.create({
            data:{
                name,email,password:hashpassword
            }
        })
        return res.status(201).json({message:"user created"})
    }
    catch(error){
        console.log('error in creating user');
        throw error;
    }

}

export const signinUser=async(req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body

    try{
         const existuser=await prisma.user.findUnique({
            where:{
                email:email
            }
         })
         if(!existuser){
            return next(new BadRequestsException('User with this email doesnot exist ',ErrorCodes.USER_NOT_FOUND));
         }
         const originalpassword=await bcrypt.compare(password,existuser.password);
         if(!originalpassword){
            return res.status(400).json({message:"wrong password"});
         }
         const jwttoken=jwt.sign({userId:existuser.id},jwtsecret);
         return res.status(201).json({message:"user logged in",jwttoken});
    }
    catch(error){
        console.log(error);

    }
}
import { NextFunction,Request,Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { prismaCilent } from "../server";

export const authMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
// 1. extract the token from the header
const token = req.headers.authorization
//2. if token not present, throw an error of unauthorized
if(!token){
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
}

try{

// 3. if the token is present, verify that token and extract the payload
const payload = jwt.verify(token as string , JWT_SECRET) as any
//4. to get the user from the payload
const user = await prismaCilent.user.findFirst({where:{id:payload.userId}})
if(!user){
    return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
}
// 5. attach the user to the current request object
req.user = user

}catch(error){
next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))

}

}


import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class JwtMiddleWare implements NestMiddleware{
    constructor(private readonly jwtService:JwtService){}

    use(req:Request,res:Response,next:NextFunction){
        const authHeader = req.headers.authorization;

        if(authHeader && authHeader.startsWith('Bearer')){
            const token = authHeader.split(' ')[1]

            try{
                const decoded = this.jwtService.verify(token)
                req["user"] = decoded;
            }catch(error){
                console.error('JWT verification error:', error);
            }
        }

        next()
    }
}
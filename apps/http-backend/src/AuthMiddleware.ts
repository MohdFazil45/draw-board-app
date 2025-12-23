import jwt from 'jsonwebtoken'
import express, { NextFunction, Request, Response } from 'express'
import { SECRET_TOKEN } from './config.js';

export const UserAuthMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.headers['authorization'] ?? "";

    const decodeInformation = jwt.verify(token, SECRET_TOKEN)

    if (decodeInformation) {
        //@ts-ignore
        res.userId = decodeInformation.userId
        next()
    } else {
        res.status(403).json({
            message:"Unauthoorized"
        })
    }
}
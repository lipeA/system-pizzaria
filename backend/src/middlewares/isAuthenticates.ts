
import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'

interface Payload{
    userId: string
}

export function isAuthenticates( req: Request, res: Response, next: NextFunction ){

   const authTokken = req.headers.authorization;


   if (!authTokken) {
        res.status(401).end()
   }

   const [, token] = authTokken.split(" ")
//    console.log(token);


   try {
    const { sub } = verify(token, process.env.JWT_SECRET) ;
    // console.log(sub)
    return next();

   } catch (error) {
    return res.status(401).end()
   }

  
   
}

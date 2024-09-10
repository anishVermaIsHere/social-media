import { NextFunction, Request, Response } from "express";



export default function otpVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const otp=req.body.otp;
        const reqId=req.body.requestId;
        

    } catch (error) {
        
    }
}
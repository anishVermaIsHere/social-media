import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"; // dont import * as jwt here
import { IToken } from "../../interfaces/index.js";

export interface IDecode extends JwtPayload {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export type TRequestAuth = Request & { decode: IDecode };

export enum TOKEN {
  ACCESS_TOKEN='ACCESS_TOKEN',
  REFRESH_TOKEN='REFRESH_TOKEN'
}

const tokenObject = {
  tokenEncode(payload) {
    const { id }=payload;
    const accessToken= jwt.sign(payload, process.env.ACCESS_TOKEN_SEC_KEY!, { algorithm: "HS256", expiresIn: process.env.ACCESS_TOKEN_EXPIRY! });
    const refreshToken=jwt.sign({ id }, process.env.REFRESH_TOKEN_SEC_KEY!, { algorithm: "HS256", expiresIn: process.env.REFRESH_TOKEN_EXPIRY! });
    return { accessToken, refreshToken}

  },
 
  tokenDecode(token, tokenType, req) {
    try {
      let decode={} as IDecode;
      if(tokenType===TOKEN['ACCESS_TOKEN']){
        decode = jwt.verify(token, process.env.ACCESS_TOKEN_SEC_KEY!) as IDecode;
      }
      if(tokenType===TOKEN['REFRESH_TOKEN']){
        decode = jwt.verify(token, process.env.REFRESH_TOKEN_SEC_KEY!) as IDecode;
      }
      if (decode?.id) {
        (<TRequestAuth>req)["decode"] = decode;
        return true;
      } else {
        return false;
      }
    
    } catch (err) {
      throw new Error("Unauthorized");
    }
  },
} as IToken;

export default tokenObject;

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

const tokenObject = {
  tokenEncode(payload) {
    const {id}=payload;
    const accessToken= jwt.sign(payload, process.env.ACCESS_TOKEN_SEC_KEY!, { algorithm: "HS256", expiresIn: process.env.ACCESS_TOKEN_EXPIRY! });
    const refreshToken=jwt.sign({ id }, process.env.REFRESH_TOKEN_SEC_KEY!, { algorithm: "HS256", expiresIn: process.env.REFRESH_TOKEN_EXPIRY! });
    return { accessToken, refreshToken}

  },

  tokenDecode(token: string, req?: Request) {
    try {
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SEC_KEY!) as IDecode;
      if (decode?.id) {
        (<TRequestAuth>req)["decode"] = decode;
        // req.decode = decode;
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      console.log("token decryption error", err);
    }
  },
} as IToken;

export default tokenObject;

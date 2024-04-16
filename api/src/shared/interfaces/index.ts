import { Request, Response } from "express";

export interface IMessageReader {
  message: string | null;
  readMessageFile: () => void;
  readMessage: (key1: string, key2: string) => string;
}

export interface IEncrypt {
  SALT: number;
  hashPassword: (plainPassword: string) => string;
  comparePassword: (plainPassword: string, dbPassword: string) => boolean;
}

export interface IToken {
  tokenEncode: (payload: {email: string; firstName:string; id: string; }) => { accessToken: string; refreshToken: string};
  tokenDecode: (token: string, req?: Request<any>) => boolean;
}

export interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  refreshToken: string;
}

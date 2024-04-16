/**
 * @author Anish Verma
 * @description upload file middleware 
 */

"use strict";
import { Request, Response, NextFunction } from "express";
import multer from 'multer';
import  cloudinary  from "../config/cloudinary.js";
import { HTTP_CODES } from "../shared/constants/constant.js";
import path from "path";
import { ApiError } from "../shared/utils/error_handler.js";

const { SERVER_ERROR, UNPROCESSABLE }= HTTP_CODES;
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
    return cb(null, './public/temp');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadOnServer = multer({ 
  storage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       return cb(new ApiError(UNPROCESSABLE,'Please upload only jpeg/png file')); // accepts only png and jpg format
     }
   cb(null, true);
  } 
});

const uploadOnCloud =  async(req: Request, res: Response, next: NextFunction) => {
  try {
    const image = `${req.file?.destination}/${req.file?.filename}`;
    const imageUrl=await cloudinary.uploader.upload(image);
    req.body.image=imageUrl.secure_url;
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(SERVER_ERROR).send('Something went wrong');
  }
};

export {
  uploadOnServer,
  uploadOnCloud
}

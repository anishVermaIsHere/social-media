import { Request, Response } from "express";
import CommentModel from "../../database/models/comment.js";
import { HTTP_CODES } from "../../shared/constants/constant.js";
import resMessage from "../../shared/i18n/msgreader.js";
import { decodedUser } from "../../shared/utils/token/token.js";

const { CREATE, SUCCESS, UNPROCESSABLE }=HTTP_CODES;

export const commentController={
    async create(req: Request, res: Response){
        try {
            const user=decodedUser(req);
            const postId=req.params.id;
            const postComment=req.body;
            const postContent={
                post: postId,
                user: user.id,
                content: postComment,
                edited : false
            };
            const post=await CommentModel.create(postContent);
            if(post && post._id){
                return res.status(CREATE).json({ post, message: resMessage.readMessage("comment", "create") });
            }
        
        } catch (error: any) {
            console.log('API: error while post comment', error.message);
            throw new Error(error.message);
        }
        
    },
    async get(req: Request, res: Response){
        console.log('call controller');
        const comments=await CommentModel.find();
       return comments as any;
    }
};
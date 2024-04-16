import { Request, Response } from 'express';
import PostModel from '../../database/models/post.js';
import { HTTP_CODES } from '../../shared/constants/constant.js';
import resMessage from '../../shared/i18n/msgreader.js';
import { CreatePostType } from '../../shared/validation/posts.js';

const{ CREATE }=HTTP_CODES;

export const postController={
    async create(req: Request<{}, CreatePostType["body"]>, res: Response){
        try {
            const post=req.body;
            console.log('post',post);
            // const postDoc=await PostModel.create(post);
            // if(postDoc&&postDoc._id){
            //     return res.status(CREATE).json({message:resMessage.readMessage('post','create')});
            // }
        } catch (error: any) {
            console.log('API: post creation error',error.message);
            throw new Error(error.message);
        }
    },
    async get(req: Request,res: Response){
        try {
            const userId=req.params.id;
            if(userId){
                await PostModel.find({})
            }
        } catch (error) {
            
        }
    },
    // async delete(req,res){

    // },
    // async update(req,res){

    // },
    // async updateLike(req,res){

    // }
}
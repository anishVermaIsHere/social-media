import { Request, Response } from 'express';
import PostModel from '../../database/models/post.js';
import { HTTP_CODES } from '../../shared/constants/constant.js';
import resMessage from '../../shared/i18n/msgreader.js';
import { CreatePostType } from '../../shared/validation/posts.js';
import { TRequestAuth } from '../../shared/utils/token/token.js';
import { deleteUploadImage } from '../../shared/utils/deleteuploadfile.js';
import mongoose from 'mongoose';

const{ CREATE, SUCCESS, BAD_REQUEST, RESOURCE_NOT_FOUND }=HTTP_CODES;

export const postController={
    async create(req: Request<{}, CreatePostType["body"]>, res: Response){
        try {
            const post={
                ...req.body,
                tags: req.body.tags.split(',').map((tag: string)=>tag.trim())
            };
            console.log('post',post);
            const postDoc=await PostModel.create(post);
            if(postDoc&&postDoc._id){
                return res.status(CREATE).json({message:resMessage.readMessage('post','create'), statusCode: CREATE });
            }
        } catch (error: any) {
            console.log('API: error while post creation', error.message);
            throw new Error(error.message);
        }
    },
    async getById(req: Request, res: Response){
        try {
            const postId=req?.params?.id || '';
            if (!mongoose.Types.ObjectId.isValid(postId)) {
                return res.status(BAD_REQUEST).json({ error: 'Invalid ID format' });
            }
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(RESOURCE_NOT_FOUND).json({ error: 'Post not found' });
            }

            return res.status(SUCCESS).json(post);
        } catch (error: any) {
            console.log('API: error while getting post by id', error.message);
            throw new Error(error.message);
        }
    },
    async get(req: Request,res: Response){
        try {
            const decode=(<TRequestAuth>req)["decode"];
            const userId=decode.id;
            if(userId){
                const result= await PostModel.find().sort({ createdAt: -1});
                return res.status(SUCCESS).json(result);
            }
        } catch (error:any) {
            console.log('API: error while fetching posts',error.message);
            throw new Error(error.message);
        }
    },
    async delete(req: Request, res: Response){
        try {
            const postId=req.params.id;
            const post=await PostModel.findById(postId);         
            const imageUrl=post?.image?.split('/');
            const imageId=imageUrl && imageUrl[imageUrl?.length-1].split('.')[0] || '';
            const isDeleted=await PostModel.deleteOne({ _id: postId });
            if(isDeleted.acknowledged){
                await deleteUploadImage(imageId); // delete image from cloudinary
                return res.status(SUCCESS).json({ message: resMessage.readMessage("post", "deletesuccess")});
            }
        } catch (error: any) {
            console.log('API: error while deleting posts', error.message);
            throw new Error(error.message);
        }
    },
    // async update(req,res){

    // },
    // async updateLike(req,res){

    // }
}
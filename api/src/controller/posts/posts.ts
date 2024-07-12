import { Request, Response } from 'express';
import PostModel from '../../database/models/post.js';
import { HTTP_CODES } from '../../shared/constants/constant.js';
import resMessage from '../../shared/i18n/msgreader.js';
import { CreatePostType } from '../../shared/validation/posts.js';
import { decodedUser, TRequestAuth } from '../../shared/utils/token/token.js';
import { deleteUploadImage } from '../../shared/utils/deleteuploadfile.js';
import mongoose from 'mongoose';
import LikeModel from '../../database/models/like.js';

const{ CREATE, SUCCESS, BAD_REQUEST, RESOURCE_NOT_FOUND }=HTTP_CODES;

export const postController={
    async create(req: Request<{}, CreatePostType["body"]>, res: Response){
        try {
            const user=decodedUser(req);
            const post={
                ...req.body,
                tags: req.body.tags.split(',').map((tag: string)=>tag.trim()),
                user: user.id
            };

            console.log('post details', post, user);
            
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
            const post = await PostModel.findById(postId).populate("user", ["-password", "-createdAt", "-updatedAt"]);
            if (!post) {
                return res.status(RESOURCE_NOT_FOUND).json({ error: 'Post not found' });
            }

            return res.status(SUCCESS).json(post);
        } catch (error: any) {
            console.log('API: error while getting post by id', error.message);
            throw new Error(error.message);
        }
    },
    async getByUser(req: Request, res: Response) {
        try {
            const user=decodedUser(req);
            const postResults=await Promise.all([
                PostModel.find({ user: user.id }).populate("user", ["-password", "-createdAt", "-updatedAt"]),
                LikeModel.find({ user: user.id }).populate("user", ["-password", "-createdAt", "-updatedAt"])
            ]);
            const [posts, likes]=postResults;
            if (!posts) {
                return res.status(RESOURCE_NOT_FOUND).json({ error: 'Post not found' });
            }
            return res.status(SUCCESS).json({ posts, likes, comments: [] });

        } catch (error:any) {
            console.log('API: error while getting post of logined user', error.message);
            throw new Error(error.message);
        }
    },
    async get(req: Request,res: Response){
        try {
            const decode=(<TRequestAuth>req)["decode"];
            const userId=decode.id;
            if(userId){
                const result= await PostModel.find().populate("user", ["-password", "-createdAt", "-updatedAt"]).sort({ createdAt: -1});
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
            const post=await postController.getById(req,res);     
            console.log('delete request', post);
            // const imageUrl=post?.image?.split('/');
            // const imageId=imageUrl && imageUrl[imageUrl?.length-1].split('.')[0] || '';
            // const isDeleted=await PostModel.deleteOne({ _id: postId });
            // if(isDeleted.acknowledged){
            //     await deleteUploadImage(imageId); // delete image from cloudinary
            //     return res.status(SUCCESS).json({ message: resMessage.readMessage("post", "deletesuccess")});
            // }
        } catch (error: any) {
            console.log('API: error while deleting posts', error.message);
            throw new Error(error.message);
        }
    },
    async like(req: Request, res: Response){
        try {
           const postId=req.params.id;
           const post=await PostModel.findById(postId);
           const user=decodedUser(req);
           await LikeModel.create({ post: post?._id, user: user.id });
           const likes=await LikeModel.find({ post: post?._id });
            const updatedPost= await PostModel.updateOne({ _id: postId }, { likes: likes.length });

           console.log('post received', updatedPost);

        } catch (error: any) {
            console.log('API: error while like post', error.message);
            throw new Error(error.message);
        }
    },
    async unlike(req: Request, res: Response){
        try {
            const post=await this.getById(req,res);
        } catch (error: any) {
            console.log('API: error while unlike post', error.message);
            throw new Error(error.message);
        }
    }
}
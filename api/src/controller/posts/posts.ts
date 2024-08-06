import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PostModel from '../../database/models/post.js';
import { HTTP_CODES } from '../../shared/constants/constant.js';
import resMessage from '../../shared/i18n/msgreader.js';
import { CreatePostType } from '../../shared/validation/posts.js';
import { decodedUser, TRequestAuth } from '../../shared/utils/token/token.js';
import { deleteUploadImage } from '../../shared/utils/deleteuploadfile.js';
import { likeController } from './likes.js';
import { commentController } from './comments.js';
import LikeModel from '../../database/models/like.js';
import CommentModel from '../../database/models/comment.js';

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
            const postDoc=await PostModel.create(post);
            if(postDoc&&postDoc._id){
                return res.status(CREATE).json({message:resMessage.readMessage('post','create'), statusCode: CREATE });
            }
        } catch (error: any) {
            console.log('API: error while post creation', error.message);
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
    // find post by id
    async findOneById(postId: string, res: Response ){
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(BAD_REQUEST).json({ error: 'Invalid ID format' });
        }
        const post = await PostModel.findById(postId).populate("user", ["-password", "-createdAt", "-updatedAt"]);
        if (!post) {
            return res.status(RESOURCE_NOT_FOUND).json({ error: 'Post not found' });
        }
        return post as any;
    },
    async getById(req: Request, res: Response){
        try {
            const postId=req?.params?.id || '';
            const user=decodedUser(req);
            const results= await Promise.all([
                postController.findOneById(postId, res),
                LikeModel.findOne({ user: user.id, post: postId }),
                CommentModel.find({ post: postId }).populate("user", ["-password", "-createdAt", "-updatedAt"])
            ]);
            const [ post, likes, comments ]=results;
            const isLiked=likes!==null;
            const updatedPost= {...post.toObject(), isLiked, comments }
            return res.status(SUCCESS).json(updatedPost);
        } catch (error: any) {
            console.log('API: error while getting post by id', error.message);
            throw new Error(error.message);
        }
    },
    async getByUser(req: Request, res: Response) {
        try {
            const user=decodedUser(req);
            const postResults=await Promise.all([
                PostModel.find({ user: user.id }).populate("user", ["-password", "-createdAt", "-updatedAt"]).sort('-createdAt'),
                likeController.get('user', user.id, res),
                commentController.getById('user', user.id)
            ]);
            const [ posts, likes, comments ]=postResults;
        //  const comments= await commentController.get(req, res);
            console.log('comments results', comments);
            
            const likedPosts = posts.map((post) => {
                const isLiked = likes.some((like: any) => like.post.toString() === post._id.toString());
                const totalComments = comments.filter((comment: any)=>comment.post.toString() === post._id.toString());
                return { ...post.toObject(), comments: totalComments, isLiked };  
            });            
            if (!posts) {
                return res.status(RESOURCE_NOT_FOUND).json({ error: 'Post not found' });
            }
            return res.status(SUCCESS).json({ posts: likedPosts });

        } catch (error:any) {
            console.log('API: error while getting post of logined user', error.message);
            throw new Error(error.message);
        }
    },
    async delete(req: Request, res: Response){
        try {
            const postId = req?.params?.id || '';
            const post = await postController.findOneById(postId, res); 
            const imageUrl = post?.image?.split('/');
            const imageId=imageUrl && imageUrl[imageUrl?.length-1].split('.')[0] || '';
            const isDeleted=await PostModel.deleteOne({ _id: postId });
            if(post.image!=='' && isDeleted.acknowledged){
                await deleteUploadImage(imageId); // delete image from cloudinary
            }
            return res.status(SUCCESS).json({ message: resMessage.readMessage("post", "deletesuccess")});
        } catch (error: any) {
            console.log('API: error while deleting posts', error.message);
            throw new Error(error.message);
        }
    }
    
};
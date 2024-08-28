
import { Request, Response } from "express";
import FollowModel from "../database/models/follow.js";
import { decodedUser } from "../shared/utils/token/token.js";
import resMessage from "../shared/i18n/msgreader.js";
import { HTTP_CODES } from "../shared/constants/constant.js";
import UserModel from "../database/models/user.js";
import PostModel from "../database/models/post.js";
import { v4 as uuidv4 } from 'uuid';

const { CREATE, SUCCESS, RESOURCE_NOT_FOUND }=HTTP_CODES;


export const userController={
    async search(req: Request, res: Response){
        try {
            const data=req.body;
            const users = await UserModel.aggregate([
                {
                    $match: {
                        $or: [
                            { firstName: { $regex: data.query, $options: 'i' } },
                            { lastName: { $regex: data.query, $options: 'i' } },
                            { email: { $regex: data.query, $options: 'i' } }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: 'follows', 
                        localField: '_id',
                        foreignField: 'following',
                        as: 'followings'
                    }
                },
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                        email: 1,
                        followings: { $map: { input: '$followings', as: 'f', in: '$$f.following' } }
                    }
                }
            ]);

            res.status(SUCCESS).json({ users });
        }  catch (error: any) {
            console.log('API: error while searching user', error.message);
            throw new Error(error.message);
        }
    },
    async posts(req: Request, res: Response){
        try {
            const user=decodedUser(req);
            const postResults=await Promise.all([
                PostModel.find({ user: user.id }).populate("user", ["-password", "-createdAt", "-updatedAt"]).sort('-createdAt'),
                FollowModel.find({ user: user.id }),
                FollowModel.find({ following: user.id })
            ]);

            const [ posts, following, followers ]=postResults; 
      
            if (!posts) {
                return res.status(RESOURCE_NOT_FOUND).json({ error: 'Post not found' });
            }
            return res.status(SUCCESS).json({ posts, following: following.length, followers: followers.length });

        } catch (error:any) {
            console.log('API: error while getting post of logined user', error.message);
            throw new Error(error.message);
        }
    },
    async follow(req: Request, res: Response){
        try {
            const user=decodedUser(req);
            const followingId=req.body.id;

            const followed = await FollowModel.find({ user: user.id, following: followingId });
            
            if (followed.length) {
                throw new Error("You are already following this user");
            }
            await FollowModel.create({ user: user.id, following: followingId });
            return res.status(CREATE).json({ message: resMessage.readMessage("user", "follow")});
    
        } catch (error: any) {
            // return res.status(BAD_REQUEST).json({ error: error.message });
            console.log('API: error while following user', error.message);
            throw new Error(error.message);
        }
       
    },
    async unfollow(req: Request, res: Response){
        try {
            const user=decodedUser(req);
            const followingId=req.body.id;
            const followed = await FollowModel.find({ user:user.id, following: followingId });
            if (!followed.length) {
                throw new Error("You are already unfollowed this user");
            }
        
            await FollowModel.deleteOne({ user: user.id, following: followingId });
            return res.status(SUCCESS).json({ message: resMessage.readMessage("user", "unfollow")});
    
        } catch (error: any) {
            console.log('API: error while unfollowing user', error.message);
            throw new Error(error.message);
        }
    },
    async getFollowing(req:Request, res:Response){
        try {
            const userId=decodedUser(req);
            const followings=await FollowModel.find({ user: userId });
            return res.status(SUCCESS).json({ followings });
        } catch (error: any) {
            console.log('API: error while getting following', error.message);
            throw new Error(error.message);
        }
    },
    async getFollowers(req:Request, res:Response){
        try {
            const userId=decodedUser(req);
            const followers=await FollowModel.find({ following: userId });
            return res.status(SUCCESS).json({ followers });
        } catch (error: any) {
            console.log('API: error while getting followers', error.message);
            throw new Error(error.message);
        }
    },
    async recoverAccount(req: Request, res: Response){
        try {
            const email=req.body.email;
            const userDoc=await UserModel.findOne({ email });
            if(userDoc && userDoc._id){
                
            }
            return res.status(SUCCESS).json({ uid: uuidv4() });
        } catch (error: any) {
            console.log('API: error while recover account', error.message);
            throw new Error(error.message);
        }
    }
}
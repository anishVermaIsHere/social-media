
import { Request, Response } from "express";
import FollowModel from "../database/models/follow.js";
import { decodedUser } from "../shared/utils/token/token.js";
import resMessage from "../shared/i18n/msgreader.js";
import { HTTP_CODES } from "../shared/constants/constant.js";

const { CREATE, SUCCESS }=HTTP_CODES;


export const userController={
    
    async follow(req: Request, res: Response){
        try {
            const userId=decodedUser(req);
            const followingId=req.body.id;
            const followed = await FollowModel.find({ userId, followingId });
            if (followed) {
                throw new Error("You are already following this user");
            }
        
            await FollowModel.create({ user: userId, following: followingId });
            return res.status(CREATE).json({ message: resMessage.readMessage("user", "follow")});
    
        } catch (error: any) {
            console.log('API: error while following user', error.message);
            throw new Error(error.message);
        }
       
    },
    async unfollow(req: Request, res: Response){
        try {
            const userId=decodedUser(req);
            const followingId=req.body.id;
            const followed = await FollowModel.find({ userId, followingId });
            if (!followed) {
                throw new Error("You are already unfollowed this user");
            }
        
            await FollowModel.deleteOne({ user: userId, following: followingId });
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
    }
}
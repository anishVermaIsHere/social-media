import { AxiosResponse } from 'axios';
import axiosInstance from '../AxiosInterceptor';

const URL='/api/v1/post'

const postAPI={
    async create(data: FormData): Promise<AxiosResponse>{
        return await axiosInstance({
            url:`${URL}/`,
            data,
            method:'POST',
            headers: {
                "Content-Type":"application/x-www-form-urlencoded", 
            }
            // headers: {
            //     "Accept":"image/jpeg",
            //     "Content-Type":"multipart/form-data"
            // }
        });
    },
    async fetchById(postId: string){
        return await axiosInstance({
            method:'GET',
            url: `${URL}/${postId}`
        });
    },
    async fetch(){
        return await axiosInstance({
            method:'GET',
            url: `${URL}/`
        });
    },
    async delete(postId: string){
        return await axiosInstance({
            method:'DELETE',
            url: `${URL}/${postId}`
        });
    }
    
};

export default postAPI;
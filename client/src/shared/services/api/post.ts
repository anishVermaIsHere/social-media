import { AxiosResponse } from 'axios';
import axiosInstance from '../interceptor';

const URL='/api/v1/post'

const postAPI={
    async create(data: FormData): Promise<AxiosResponse>{
        const { accessToken }=JSON.parse(localStorage.getItem('user-info')||'{}');
        return await axiosInstance({
            url:`${URL}/`,
            data,
            method:'POST',
            headers: {
                "Content-Type":"application/x-www-form-urlencoded", 
                'Authorization': 'Bearer ' + accessToken
            }
            // headers: {
            //     "Accept":"image/jpeg",
            //     "Content-Type":"multipart/form-data"
            // }
        });
    },
    async fetch(){
        return await axiosInstance({
            method:'GET',
            url: `${URL}/`
        })
    }
    
};

export default postAPI;
import { AxiosResponse } from 'axios';
import axiosInstance from '../AxiosInterceptor';


const URL='/api/v1/user'

const userAPI={
    async search(query: string): Promise<AxiosResponse<any, any>>{
        return await axiosInstance.post(`${URL}/search`, { query });        
    },
    async follow(id: string){
        return await axiosInstance.post(`${URL}/follow`, { id });
    },
    async unfollow(id: string){
        return await axiosInstance.post(`${URL}/unfollow`, { id });
    }
};

export default userAPI;
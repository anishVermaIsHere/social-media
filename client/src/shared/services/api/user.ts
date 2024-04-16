import axios, { AxiosResponse } from 'axios';
import { IUserCreate, IUserLogin } from '../../../modules/user/interfaces';

const axiosInstance=axios.create({
    baseURL:`${import.meta.env.VITE_BASE_URL}/api/v1/user`,
    headers: {
        "Content-Type": "application/json",
        "timeout" : 3000
    },
});

const userAPI={
    async register(user: IUserCreate): Promise<AxiosResponse>{
        return await axiosInstance.post('/new',user);
    },
    async login(user: IUserLogin): Promise<AxiosResponse>{
        return await axiosInstance.post('/',user);        
    }
};

export default userAPI;
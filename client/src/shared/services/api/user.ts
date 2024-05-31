import { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '../interceptor';
import { IUserCreate, IUserLogin } from '../../../modules/user/interfaces';

interface IErrorResponse {
    message: string
}

const URL='/api/v1/user'

const userAPI={
    async register(user: IUserCreate): Promise<AxiosResponse>{
        try {
            return await axiosInstance.post(`${URL}/new`,user);
        } catch (error) {
            const err = error as AxiosError<IErrorResponse>;
            throw new Error(err.response?.data.message);
        }
    },
    async login(user: IUserLogin): Promise<AxiosResponse>{
        return await axiosInstance.post(`${URL}/`,user);        
    }
};

export default userAPI;
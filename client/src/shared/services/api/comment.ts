import axiosInstance from "../AxiosInterceptor";

const URL='/api/v1/comment';

const commentAPI={
    async create(data: any){
        console.log('data', data);
        return axiosInstance({
            url: `${URL}/`,
            method: 'POST',
            data
        })
    },
    async delete(commentId: string){
        return axiosInstance({
            url: `${URL}/${commentId}`
        })
    },
    async get(){
        
    }
};

export default commentAPI;
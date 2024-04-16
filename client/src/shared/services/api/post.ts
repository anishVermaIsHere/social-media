import axios, { AxiosResponse } from 'axios';

const URL='/api/v1/post'

const postAPI={
    async create(data): Promise<AxiosResponse>{
        // const {accessToken}=JSON.parse(localStorage.getItem('user-info')||'{}')
        return await axios({
            url:`${URL}/`,
            data,
            method:'POST',
            // headers: {
            //     "Content-Type":"application/x-www-form-urlencoded",
            //     'Authorization': 'Bearer ' + accessToken
            // }
            // headers: {
            //     "Accept":"image/jpeg",
            //     "Content-Type":"multipart/form-data"
            // }
        });
    },
   
    
};

export default postAPI;
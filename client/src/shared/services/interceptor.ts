import axios, { InternalAxiosRequestConfig, AxiosResponse} from "axios";
import { parsePersistedData } from "../parse.util";

const axiosInstance=axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

let isRefreshAttempted=false;

export function interceptor() {
    const getAuth=()=>{
        const auth=localStorage.getItem("persist:auth") || '{}';
        const parsedData=parsePersistedData(JSON.parse(auth));
        return parsedData;
    }
    const getRefreshToken=()=>{
        const auth=getAuth();
        try {
            if(auth.refreshToken){
                
            }
        } catch (error) {
            throw new Error('Logout');
        }
      
    };

    axiosInstance.interceptors.request.use(
        (request: InternalAxiosRequestConfig) => {
            request.headers["User-Agent"] = window.navigator.userAgent;
            const auth=getAuth();
            if (auth!== null) {
                const accessToken = auth.accessToken;
                request.headers["Authorization"]=`Bearer ${accessToken}`; 
             }
            
            return request;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log('response',response)
            return response;
        },
        (err) => {
            console.log('err',err);
            try {
                if(err?.response?.status === 401 && !isRefreshAttempted){
                    isRefreshAttempted=true;
                }
            } catch (error) {
                console.log('Error while', error);
            }
            return Promise.reject(err);
        }
    );

}

export default axiosInstance;
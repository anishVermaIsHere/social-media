import axios, { InternalAxiosRequestConfig, AxiosResponse} from "axios";
import { parsePersistedData } from "../parse.util";

const axiosInstance=axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export function interceptor() {
    axiosInstance.interceptors.request.use(
        (request: InternalAxiosRequestConfig) => {
            const auth=localStorage.getItem("persist:auth") || '{}';
            request.headers["User-Agent"] = window.navigator.userAgent;
            if (auth!== null) {
                const parsedData=parsePersistedData(JSON.parse(auth));
                const accessToken = parsedData.accessToken;
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
            return response;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

}

export default axiosInstance;
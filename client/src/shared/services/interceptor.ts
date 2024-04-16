import axios, { InternalAxiosRequestConfig, AxiosResponse} from "axios";

export function interceptor() {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    const requestInterceptor = axios.interceptors.request.use(
        (request: InternalAxiosRequestConfig) => {
            const localData= localStorage.getItem("user-info")||'{}';
            if (localData!== null) {
                const accessToken = JSON.parse(localData).accessToken;
                request.headers["Authorization"]=`Bearer ${accessToken}`;
             }
            
            return request;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    const responseInterceptor = axios.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

}

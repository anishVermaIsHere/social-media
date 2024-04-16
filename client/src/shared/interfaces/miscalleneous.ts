
export interface ISnackBar {
    message: string;
    type:string; 
    open:boolean;
}

export interface IAuth {
    isAuthenticated: boolean,
    id:string,
    firstName:string,
    lastName:string,
    email: string,
    gender: string;
    image:string,
    accessToken: string,
    message: string,
    error: ''
}
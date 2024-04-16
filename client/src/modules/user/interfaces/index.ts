
export interface IUserCreate {
    firstName: string;
    lastName: string;
    gender: string;    
    email: string;
    password: string;
    repeatPassword: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}
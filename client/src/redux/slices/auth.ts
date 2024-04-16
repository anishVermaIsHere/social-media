import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../shared/interfaces/miscalleneous";
import { ROUTES } from "../../routes/routeslinks"

const initialState: IAuth={
    isAuthenticated:false,
    id:'',
    firstName:'',
    lastName:'',
    gender:'',
    email: '',
    accessToken: '',
    image:'',
    message: '',
    error: ''
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        handleAuth(state, action) {
            const {firstName,lastName,email,accessToken,id,gender} = action.payload;
            localStorage.setItem('user-info', JSON.stringify({
                firstName,
                lastName,
                email,
                gender,
                accessToken,
                id
              })||'{}');

            if (action.payload) {                
                state.isAuthenticated=true;
                state.firstName=firstName;
                state.lastName=lastName;
                state.gender=gender;
                state.email = email;
                state.accessToken = accessToken;
                state.id=id;
            }
            return state;
        },
        handleLogout(state){                               
            localStorage.removeItem('user-info');
            window.location.href=ROUTES.LOGIN;
            state.isAuthenticated=false;
            state.firstName='';
            state.lastName='';
            state.gender='',
            state.email = '';
            state.accessToken= '';
            return state;
        }
        
    }
    
})


export const { handleAuth, handleLogout} = authSlice.actions;
export default authSlice.reducer;
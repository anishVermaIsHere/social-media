import { configureStore } from '@reduxjs/toolkit';
import snackBar from '../slices/snackbar';
import authSlice from '../slices/auth';
import { useSelector,useDispatch,TypedUseSelectorHook } from 'react-redux';


const store = configureStore({
    reducer: {
        snackBar,
        authSlice
    }
});

store.subscribe(()=>{
    // console.log("State Update .... ", store.getState());
}) 


export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
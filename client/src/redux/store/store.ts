import { configureStore, combineReducers } from '@reduxjs/toolkit';
import snackBar from '../slices/snackbar';
import authSlice from '../slices/auth';
import { useSelector,useDispatch,TypedUseSelectorHook } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'auth',
    storage,
};


const persistedReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({ 
    auth: persistedReducer,
    snackbar: snackBar
});

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => // source: https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
        getDefaultMiddleware({
          serializableCheck: false,
    }),

});

store.subscribe(()=>{
    // console.log("State Update .... ", store.getState());
}); 


export const persistor = persistStore(store); 
export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
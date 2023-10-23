import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter';
import cartReducer from './features/cart';
import authReducer from './features/auth';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        counterReducer,
        cartReducer,
        authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
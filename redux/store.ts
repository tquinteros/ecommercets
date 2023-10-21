import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import counterReducer from './features/counter';
import cartReducer from './features/cart';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        authReducer,
        counterReducer,
        cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
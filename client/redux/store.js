import { configureStore } from '@reduxjs/toolkit'
import pinReducer from '../redux/slices/pin/pinSlice'
import authReducer from './slices/auth/authSlice'

export const store = configureStore({
    reducer: {
        pin: pinReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

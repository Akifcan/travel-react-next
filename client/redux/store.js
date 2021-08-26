import { configureStore } from '@reduxjs/toolkit'
import pinReducer from '../redux/pinSlice';
export const store = configureStore({
    reducer: {
        pin: pinReducer
    }
})
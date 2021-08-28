import { configureStore } from '@reduxjs/toolkit'
import pinReducer from '../redux/slices/pin/pinSlice';
export const store = configureStore({
    reducer: {
        pin: pinReducer
    }
})

store.subscribe(() => {
    console.log(store.getState());
})


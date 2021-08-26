import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCount, fetchPins } from './pinApi'

const initialState = {
    value: 0,
    pins: []
}

export const incrementAsync = createAsyncThunk(
    'pin/fetchCount',
    async (amount) => {
        const response = await fetchCount(amount);
        return response.data;
    }
)

export const fetchPinsAsync = createAsyncThunk(
    'pin/fetchPins',
    async _ => {
        const response = await fetchPins();
        return response
    }
)

export const counterSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                console.log('WAIT!')
            })
            .addCase(fetchPinsAsync.pending, _ => {
                console.log('wait please')
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.value += action.payload
            })
            .addCase(fetchPinsAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.pins = action.payload
            })
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const selectCount = (state) => state.pin.value
export const selectPins = (state) => state.pin.pins

export default counterSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPins, getCurrentUser, getObjectStore } from './pinApi'

const initialState = {
    pins: []
}

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
        addPin: (state, value) => {
            const { title, description, coordinates } = value.payload
            const { lat, long } = coordinates
            state.pins.push({ title, desc: description, coordinates, lat, long, ratio: 5, createdAt: Date.now, username: JSON.parse(localStorage.user).username })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPinsAsync.pending, _ => {
                console.log('wait please')
            })
            .addCase(fetchPinsAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.pins = action.payload
            })
    }
})

export const { addPin } = counterSlice.actions
export const selectPins = (state) => state.pin.pins

export default counterSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPins } from './pinApi'
import { getCurrentUser, addNewPlace } from '../../../apis'

const initialState = {
    snackbarResult: null,
    message: '',
    pins: []
}

export const fetchPinsAsync = createAsyncThunk(
    'pin/fetchPins',
    async _ => {
        const response = await fetchPins()
        return response
    }
)

export const addNewPinAsync = createAsyncThunk(
    'pin/addNewPin',
    async (data) => {
        const { title, description, coordinates } = data
        const { lat, long } = coordinates
        const pinData = { title, desc: description, coordinates, lat, long, ratio: 5, createdAt: Date.now, username: getCurrentUser().username }
        const response = await addNewPlace(pinData)
        return response == 201 ? true : false
    }
)

export const counterSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        addPin: (state, value) => {
            const { title, description, coordinates } = value.payload
            const { lat, long } = coordinates
            const pinData = { title, desc: description, coordinates, lat, long, ratio: 5, createdAt: Date.now, username: getCurrentUser().username }
            state.pins.push(pinData)
            addNewPlace(pinData)
        },
        closeDialog: (state) => {
            state.snackbarResult = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPinsAsync.pending, _ => {
            })
            .addCase(fetchPinsAsync.fulfilled, (state, action) => {
                state.pins = action.payload
            })
            .addCase(addNewPinAsync.pending, (state) => {
                state.message = 'Please Wait'
            })
            .addCase(addNewPinAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.message = 'New pin successfully added'
                    state.snackbarResult = true
                } else {
                    state.message = 'Sorry unexcepted error'
                    state.snackbarResult = false
                }
            })
    }
})

export const { addPin, closeDialog } = counterSlice.actions
export const selectPins = (state) => state.pin.pins
export const selectMessage = (state) => state.pin.message
export const selectSnackbarResult = (state) => state.pin.snackbarResult

export default counterSlice.reducer
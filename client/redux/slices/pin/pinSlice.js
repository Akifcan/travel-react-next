import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPins, fetchListedPins } from './pinApi'
import { getCurrentUser, addNewPlace } from '../../../apis'
import socket from '../../socket'


const initialState = {
    snackbarResult: false,
    message: '',
    pins: [],
    listedPins: [],
    io: null
}

export const fetchPinsAsync = createAsyncThunk(
    'pin/fetchPins',
    async _ => {
        const response = await fetchPins()
        return response
    }
)

export const fetchListedPinsAsync = createAsyncThunk(
    'pin/fetchListedPins',
    async _ => {
        const response = await fetchListedPins()
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
        if (response === 201) {
            socket.emit('new-place', pinData)
            return true
        } else {
            return false
        }
    }
)

export const counterSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        handleSocketIo: (state, value) => {
            state.io = value.payload
        },
        setSnackbarMessage: (state, value) => {
            state.message = value.payload
            state.snackbarResult = true
        },
        addPin: (state, value) => {
            const { title, description, coordinates } = value.payload
            const { lat, long } = coordinates
            const pinData = { title, desc: description, coordinates, lat, long, ratio: 5, createdAt: Date.now, username: getCurrentUser().username }
            state.pins.push(pinData)
            addNewPlace(pinData)
        },
        pushPin: (state, value) => {
            state.pins.push(value.payload)
            state.message = "New pin added!"
            state.snackbarResult = true
        },
        closeDialog: (state) => {
            state.snackbarResult = false
            state.message = ''
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
            .addCase(fetchListedPinsAsync.fulfilled, (state, action) => {
                state.listedPins = action.payload
            })
    }
})

export const { addPin, closeDialog, setSnackbarMessage, pushPin } = counterSlice.actions
export const selectPins = (state) => state.pin.pins
export const selectMessage = (state) => state.pin.message
export const selectSnackbarResult = (state) => state.pin.snackbarResult
export const selectListedPins = (state) => state.pin.listedPins

export default counterSlice.reducer
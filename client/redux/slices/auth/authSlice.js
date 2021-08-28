import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, setObjectStore, registerApi } from '../../../apis'

const initialState = {
    isLoggedIn: false,
    dialogMessage: '',
    dialogStatus: ''
}


export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async ({ email, password }) => {
        return await loginApi({ email, password })
    }
)

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async ({ email, password, username }) => {
        return await registerApi({ email, password, username })
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, state => {
                state.dialogMessage = 'Please wait'
                state.dialogStatus = 'info'
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                const { data, status, message } = action.payload
                if (status) {
                    setObjectStore('user', data)
                    state.isLoggedIn = true
                } else {
                    state.isLoggedIn = false
                    state.dialogStatus = 'error'
                    state.dialogMessage = message
                }
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isLoggedIn = false
                state.dialogMessage = action.error.message
                state.dialogStatus = 'error'
            })
    }
})

export const selectDialogMessage = state => state.auth.dialogMessage
export const selectDialogStatus = state => state.auth.dialogStatus
export const selectIsLoggedIn = state => state.auth.isLoggedIn

export default authSlice.reducer
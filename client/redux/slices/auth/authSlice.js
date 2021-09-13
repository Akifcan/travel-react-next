import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, setObjectStore, registerApi, logoutUser } from '../../../apis'

const initialState = {
	isLoggedIn: false,
	dialogMessage: '',
	dialogStatus: ''
}

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async ({ email, password }) => {
	return await loginApi({ email, password })
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async ({ email, password, username }) => {
	return await registerApi({ email, password, username })
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedIn: (state, data) => {
			state.isLoggedIn = data.payload
		},
		logout: (state, data) => {
			state.isLoggedIn = false
			logoutUser()
			console.log('LOGOUT!')
		}
	},
	extraReducers: builder => {
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
			.addCase(fetchRegister.pending, state => {
				state.dialogMessage = 'Please wait'
				state.dialogStatus = 'info'
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				if (action.payload.data) {
					state.isLoggedIn = true
					setObjectStore('user', action.payload.data)
				} else {
					console.log('no data!')
					state.dialogMessage = action.payload.message
					state.dialogStatus = 'error'
				}
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.isLoggedIn = false
				state.dialogMessage = action.payload.message
				state.dialogStatus = 'error'
			})
	}
})

export const { setIsLoggedIn, logout } = authSlice.actions

export const selectDialogMessage = state => state.auth.dialogMessage
export const selectDialogStatus = state => state.auth.dialogStatus
export const selectIsLoggedIn = state => state.auth.isLoggedIn

export default authSlice.reducer

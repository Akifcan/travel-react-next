import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField, Button, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useSelector, useDispatch } from 'react-redux'


import { fetchLogin, fetchRegister, selectDialogMessage, selectDialogStatus } from '../redux/slices/auth/authSlice'


export default function AppDialog({ openDialog, setOpenDialog, dialogTitle }) {

    const dispatch = useDispatch()
    const dialogMessage = useSelector(selectDialogMessage)
    const dialogStatus = useSelector(selectDialogStatus)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [errors, setErrors] = useState({
        usernameError: false,
        emailError: false,
        passwordError: false
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        const result = await Promise.resolve(dispatch(fetchLogin({ email, password })))
        if (result.payload.status) {
            setOpenDialog()
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const result = await Promise.resolve(dispatch(fetchRegister({ email, password, username })))
        if (result.payload.data) {
            setOpenDialog()
        }
    }

    return (
        <Dialog
            open={openDialog}
            keepMounted
            onClose={setOpenDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <form className="full-width dialog-form" onSubmit={dialogTitle == 'Login' ? handleLogin : handleRegister}>
                <DialogTitle id="alert-dialog-slide-title">{dialogTitle + ' to Travel'}</DialogTitle>
                <br />
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {dialogMessage.length > 0 && (
                            <Alert severity={dialogStatus}>{dialogMessage}</Alert>
                        )}
                        <br />
                        <Grid container spacing={3}>
                            {dialogTitle == 'Register' && (
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={(e) => {
                                            if (e.target.value.length > 20 || e.target.value.length < 3) {
                                                setErrors(prevState => {
                                                    return { ...prevState, usernameError: true }
                                                })
                                            } else {
                                                setErrors(prevState => {
                                                    return { ...prevState, usernameError: false }
                                                })
                                            }
                                        }}
                                        error={errors.usernameError}
                                        helperText={errors.usernameError ? 'Please enter your username' : ''}
                                        className="full-width"
                                        id="username"
                                        inputProps={{
                                            maxLength: 20,
                                            minLength: 3
                                        }}
                                        label="Username"
                                        variant="filled" />
                                </Grid>
                            )}
                            <Grid item xs={12} md={12}>
                                <TextField
                                    error={errors.emailError}
                                    helperText={errors.emailError ? 'Please enter your email' : ''}
                                    className="full-width"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    onBlur={(e) => {
                                        if (e.target.value.length < 1) {
                                            setErrors(prevState => {
                                                return { ...prevState, emailError: true }
                                            })
                                        } else {
                                            setErrors(prevState => {
                                                return { ...prevState, emailError: false }
                                            })
                                        }
                                    }}
                                    id="email"
                                    type="email"
                                    label="Email"
                                    variant="filled" />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    error={errors.passwordError}
                                    helperText={errors.passwordError ? 'Please enter at least 3 character for password' : ''}
                                    className="full-width"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={(e) => {
                                        if (e.target.value.length < 3) {
                                            setErrors(prevState => {
                                                return { ...prevState, passwordError: true }
                                            })
                                        } else {
                                            setErrors(prevState => {
                                                return { ...prevState, passwordError: false }
                                            })
                                        }
                                    }}
                                    id="password"
                                    type="password"
                                    label="Password"
                                    variant="filled" />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" type="submit">
                        {dialogTitle}
                    </Button>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Back
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

import React, { useState, useEffect } from 'react'
import { Box, Button } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import { getCurrentUser } from '../apis'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useSelector, useDispatch } from 'react-redux'

import { selectIsLoggedIn, setIsLoggedIn, logout } from '../redux/slices/auth/authSlice'


export default function AppManageAuth({ setOpenDialog, setDialogTitle }) {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (getCurrentUser()) {
            dispatch(setIsLoggedIn(true))
        }
    }, [])

    return (
        <Box className="buttons">
            {!isLoggedIn ? (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setOpenDialog(true)
                            setDialogTitle('Login')
                        }}
                        startIcon={<LockOpenIcon />}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setOpenDialog(true)
                            setDialogTitle('Register')
                        }}
                        endIcon={<AssignmentIndIcon />}
                    >
                        Register
                    </Button>
                </>
            ) :
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        dispatch(logout())
                    }}
                    startIcon={<ExitToAppIcon />}
                >
                    Logout
                </Button>
            }
        </Box>
    )
}

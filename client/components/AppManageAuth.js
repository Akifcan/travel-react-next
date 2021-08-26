import React, { useState, useEffect } from 'react'
import { Box, Button } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import { getCurrentUser } from '../apis'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default function AppManageAuth({ setOpenDialog, setDialogTitle }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (getCurrentUser()) {
            setIsLoggedIn(true)
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
                    startIcon={<ExitToAppIcon />}
                >
                    Logout
                </Button>
            }
        </Box>
    )
}

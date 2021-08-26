import React from 'react'
import { Box, Button } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'


export default function AppManageAuth({ setOpenDialog, setDialogTitle }) {
    return (
        <Box className="buttons">
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
        </Box>
    )
}

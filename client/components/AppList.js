import React, { useState } from 'react'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { Box, Button } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import PlaceCard from './PlaceCard'
import { useSelector } from 'react-redux'
import { selectListedPins } from '../redux/slices/pin/pinSlice'

export default function AppList() {

    const pins = useSelector(selectListedPins)

    const [drawerToggle, setDrawerToggle] = useState(true)
    return (
        <>
            <Drawer anchor={"right"} open={drawerToggle} onClose={() => setDrawerToggle(false)}>
                {pins.map(pin => (
                    <PlaceCard pin={pin} />
                ))}
            </Drawer>
            <Box className="list-places-button">
                <Button
                    onClick={() => setDrawerToggle(true)}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ListAltIcon />}
                >
                    List Places
                </Button>
            </Box>
        </>
    )
}

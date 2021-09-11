import React, { useState } from 'react'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { Box, Button } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import PlaceCard from './PlaceCard'

export default function AppList() {
    const [drawerToggle, setDrawerToggle] = useState(true)
    return (
        <>
            <Drawer anchor={"right"} open={drawerToggle} onClose={() => setDrawerToggle(false)}>
                <PlaceCard />
            </Drawer>
            <Box className="list-places-button">
                <Button
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

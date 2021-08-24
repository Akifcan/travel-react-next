import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import AppMarker from '../components/AppMarker'
import MapIcon from '@material-ui/icons/Map'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { Box, TextField, Button, Grid } from '@material-ui/core'

export default function Home() {

  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')

  const [viewport, setViewport] = useState({
    latitude: 38.423733,
    longitude: 27.142826,
    zoom: 8
  })

  async function getPins() {
    const response = await fetch('http://localhost:5000/api/pins')
    const json = await response.json()
    console.log(json);
    setPins(json)
  }

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    setCurrentPosition({ lat: e.lngLat[1], long: e.lngLat[0] })
  }

  const handleNewPlace = () => {
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const coordinates = currentPosition
    setCurrentPosition(null)
    console.log({ title, description, coordinates });
  }

  useEffect(() => {
    getPins()
  }, [])

  useEffect(() => {
    console.log(currentPosition);
  }, [currentPosition])

  return (
    <Box className="map-wrapper">
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{dialogTitle + ' to Travel'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  className="full-width"
                  id="title"
                  label="Title"
                  variant="filled" />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  className="full-width"
                  required
                  id="title"
                  type="password"
                  label="Password"
                  variant="filled" />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            {dialogTitle}
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
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
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
        mapStyle={process.env.MAPBOX_MAP_STYLE}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
        onClick={() => setCurrentPosition(null)}
        onDblClick={handleAddClick}
      >

        {pins.map((pin, index) => {
          return <AppMarker
            pin={pin}
            zoom={viewport.zoom}
            handleMarkerClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
            currentPlaceId={currentPlaceId}
            closeHandler={() => setCurrentPlaceId(null)}
            key={index} />
        })}

        {currentPosition != null && (
          <>
            <Marker
              offsetLeft={-20}
              offsetTop={-10}
              latitude={currentPosition.lat} longitude={currentPosition.long}>
              <MapIcon style={{ fontSize: viewport.zoom * 7 }} />
            </Marker>
            <Popup
              offsetLeft={20}
              offsetTop={0}
              anchor="left"
              latitude={currentPosition.lat} longitude={currentPosition.long}>
              <Box
                className="add-place-popup">
                <h1>Add Place</h1>
                <TextField
                  required
                  id="title"
                  label="Title"
                  variant="filled" />
                <TextField
                  required
                  id="description"
                  variant="filled"
                  label="Description"
                  multiline
                  rows={4}
                />
                <Button variant="contained" color="primary" onClick={() => handleNewPlace()}>
                  Add New Place
                </Button>
              </Box>
            </Popup>
          </>
        )
        }

      </ReactMapGL>
    </Box>
  )
}

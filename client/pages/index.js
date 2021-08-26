import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import AppMarker from '../components/AppMarker'
import MapIcon from '@material-ui/icons/Map'
import AppDialog from '../components/AppDialog'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Box, TextField, Button } from '@material-ui/core'
import AppManageAuth from '../components/AppManageAuth'
import { useSelector, useDispatch } from 'react-redux'
import {
  increment,
  selectCount,
  selectPins,
  fetchPinsAsync,
  incrementAsync
} from '../redux/pinSlice';

export default function Home() {

  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const pins = useSelector(selectPins)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')

  const [viewport, setViewport] = useState({
    latitude: 38.423733,
    longitude: 27.142826,
    zoom: 8
  })

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
    dispatch(fetchPinsAsync())
  }, [])

  return (
    <Box className="map-wrapper">
      <AppDialog openDialog={openDialog} dialogTitle={dialogTitle} setOpenDialog={() => {
        setOpenDialog(false)
        setOpenSnackbar(true)
      }} />
      <Snackbar open={openSnackbar} autoHideDuration={2000}>
        <Alert severity="success">
          Welcome Back ✈🚢🧳
        </Alert>
      </Snackbar>
      <AppManageAuth setDialogTitle={setDialogTitle} setOpenDialog={setOpenDialog} />
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

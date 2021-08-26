import React, { useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'
import AppMarker from '../components/AppMarker'
import AppDialog from '../components/AppDialog'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Box } from '@material-ui/core'
import AppManageAuth from '../components/AppManageAuth'
import { useSelector, useDispatch } from 'react-redux'
import AppAddNewPlace from '../components/AppAddNewPlace'
import {
  selectPins,
  selectMessage,
  selectSnackbarResult,
  fetchPinsAsync,
} from '../redux/pinSlice'

export default function Home() {

  const dispatch = useDispatch()
  const pins = useSelector(selectPins)
  const message = useSelector(selectMessage)
  const snackbarStatus = useSelector(selectSnackbarResult)
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

  useEffect(() => {
    dispatch(fetchPinsAsync())
  }, [])

  return (
    <Box className="map-wrapper">
      <AppDialog openDialog={openDialog} dialogTitle={dialogTitle} setOpenDialog={() => {
        setOpenDialog(false)
      }} />
      {snackbarStatus != null && (
        <Snackbar open={snackbarStatus} autoHideDuration={2000}>
          <Alert severity={snackbarStatus ? 'success' : 'error'}>
            {message}
          </Alert>
        </Snackbar>
      )}
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

        {currentPosition != null && (<AppAddNewPlace
          currentPosition={currentPosition}
          zoom={viewport.zoom}
          setCurrentPosition={() => setCurrentPosition(null)}
        />)}
      </ReactMapGL>
    </Box>
  )
}

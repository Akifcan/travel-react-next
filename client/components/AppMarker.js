import React, { Fragment } from 'react'
import MapIcon from '@material-ui/icons/Map'
import StarIcon from '@material-ui/icons/Star'
import { Box } from '@material-ui/core'
import { Marker, Popup } from 'react-map-gl'
import * as timeago from 'timeago.js';

export default function AppMarker({ pin, zoom, handleMarkerClick, currentPlaceId, closeHandler }) {
    return (
        <Fragment>
            <Marker
                latitude={pin.lat}
                longitude={pin.long}
                offsetLeft={-20}
                offsetTop={-10}
                style={{ zIndex: -1 }}
                onClick={handleMarkerClick}
            >
                <MapIcon style={{ fontSize: zoom * 7 }} />
            </Marker>
            {pin._id === currentPlaceId && (
                <Popup
                    latitude={pin.lat}
                    longitude={pin.long}
                    closeButton={true}
                    closeOnClick={true}
                    anchor="left"
                    onClose={closeHandler}
                >
                    <Box
                        style={{ position: 'relative', zIndex: 9999 }}
                    >
                        <label>Place</label>
                        <h4 className="place">{pin.title}</h4>
                        <label>Review</label>
                        <p>{pin.desc}</p>
                        <label>Rating</label>
                        {Array.from({ length: pin.ratio }).map((_, index) => {
                            return <StarIcon key={index} />
                        })}
                        <br />
                        <label>Information</label>
                        <div className="username">Created by <b>{pin.username}</b> </div>
                        <div className="username">{timeago.format(new Date(pin.createdAt)).replace('ago', '')} <b>ago</b> </div>
                    </Box>
                </Popup>
            )}

        </Fragment>
    )
}

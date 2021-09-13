import React, { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import { Box, TextField, Button } from '@material-ui/core'
import MapIcon from '@material-ui/icons/Map'
import { useDispatch } from 'react-redux'
import { addPin, addNewPinAsync, closeDialog } from '../redux/slices/pin/pinSlice'

export default function AppAddNewPlace({ currentPosition, zoom, setCurrentPosition }) {
	const dispatch = useDispatch()

	const [errorState, setErrorState] = useState({
		titleValid: true,
		descriptionValid: true
	})

	const handleNewPlace = e => {
		e.preventDefault()
		const title = document.getElementById('title').value
		const description = document.getElementById('description').value
		const coordinates = currentPosition
		setCurrentPosition()
		dispatch(addPin({ title, description, coordinates }))
		dispatch(addNewPinAsync({ title, description, coordinates }))
		setTimeout(() => {
			dispatch(closeDialog())
		}, 5000)
	}

	return (
		<>
			<Marker offsetLeft={-20} offsetTop={-10} latitude={currentPosition.lat} longitude={currentPosition.long}>
				<MapIcon style={{ fontSize: zoom * 7 }} />
			</Marker>
			<Popup
				offsetLeft={20}
				offsetTop={0}
				anchor="left"
				latitude={currentPosition.lat}
				longitude={currentPosition.long}
			>
				<form className="dialog-form" onSubmit={handleNewPlace}>
					<Box className="add-place-popup">
						<h1>Add Place</h1>
						<TextField
							required
							error={!errorState.titleValid}
							onBlur={e => {
								if (e.target.value.length < 0) {
									setErrorState(prevState => {
										return { ...prevState, titleValid: false }
									})
								} else {
									setErrorState(prevState => {
										return { ...prevState, titleValid: true }
									})
									console.log('pret')
									console.log('ier')
									console.log('test')
									console.log('test')
									console.log("my test")
								}
							}}
							helperText={!errorState.titleValid ? 'Please enter title' : ''}
							id="title"
							label="Title"
							variant="filled"
						/>
						<TextField
							required
							id="description"
							onBlur={e => {
								if (e.target.value.length < 0) {
									setErrorState(prevState => {
										return { ...prevState, descriptionValid: false }
									})
								} else {
									setErrorState(prevState => {
										return { ...prevState, descriptionValid: true }
									})
								}
							}}
							error={!errorState.descriptionValid}
							helperText={!errorState.descriptionValid ? 'Please enter a description' : ''}
							variant="filled"
							label="Description"
							multiline
							rows={4}
						/>
						<Button variant="contained" color="primary" type="submit">
							Add New Place
						</Button>
					</Box>
				</form>
			</Popup>
		</>
	)
}

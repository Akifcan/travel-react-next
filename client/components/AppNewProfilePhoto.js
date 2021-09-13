import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, Avatar, Tooltip } from '@material-ui/core'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import { getCurrentUser, controlFileType } from '../apis'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CancelIcon from '@material-ui/icons/Cancel'
import Alert from '@material-ui/lab/Alert'
import { useSelector, useDispatch } from 'react-redux'

import { changeProfilePhoto, getAvatar } from '../apis'
import { selectIsLoggedIn, setIsLoggedIn } from '../redux/slices/auth/authSlice'

export default function AppNewProfilePhoto() {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const fileInput = useRef()
	const [openDialog, setOpenDialog] = useState(false)
	const [avatarPreview, setAvatarPreview] = useState('')
	const [avatarAlt, setAvatarAlt] = useState('')
	const [isError, setIsError] = useState(false)
	const [fileSelected, setFileSelected] = useState(false)
	const [selectedFile, setSelectedFile] = useState(null)

	const onFileSelected = e => {
		const selectedFile = e.target.files[0]
		setIsError(!controlFileType(selectedFile.type))
		setFileSelected(true)
		setAvatarPreview(URL.createObjectURL(selectedFile))
		setSelectedFile(e.target.files[0])
	}

	const handleUploadPhoto = () => {
		fileInput.current.click()
	}

	const changeAvatar = () => {
		changeProfilePhoto(selectedFile)
	}

	useEffect(() => {
		if (getCurrentUser() != null) {
			dispatch(setIsLoggedIn(true))
			setAvatarPreview(getAvatar())
			setAvatarAlt(getCurrentUser().username)
		}
	}, [])

	return (
		isLoggedIn && (
			<Box className="user-info">
				<Dialog
					className="upload-form"
					aria-labelledby="simple-dialog-title"
					open={openDialog}
					onClose={() => setOpenDialog(false)}
				>
					<DialogTitle id="simple-dialog-title">Set new profile photo</DialogTitle>
					{fileSelected && (
						<Alert severity={isError ? 'error' : 'info'}>
							{isError ? 'This is not a image' : 'You can use this image'}
						</Alert>
					)}
					<DialogContent className="upload-form">
						<Avatar className="avatar large" alt={avatarAlt} src={avatarPreview} />
						<input onChange={onFileSelected} ref={fileInput} className="hidden" type="file" />
						{!fileSelected ? (
							<Button onClick={handleUploadPhoto} variant="contained" color="primary">
								Upload photo
							</Button>
						) : (
							<Button onClick={changeAvatar} variant="contained" color="default">
								Confirm Upload
							</Button>
						)}
						<Button
							onClick={() => setOpenDialog(false)}
							variant="contained"
							color="secondary"
							startIcon={<CancelIcon />}
						>
							Back
						</Button>
					</DialogContent>
				</Dialog>
				<Tooltip
					title="Upload new profile picture"
					aria-label="Upload new profile picture"
					onClick={() => setOpenDialog(true)}
				>
					<Avatar className="avatar" alt="Remy Sharp" src={getAvatar()} />
				</Tooltip>
				<Button
					onClick={() => setOpenDialog(true)}
					variant="contained"
					color="primary"
					startIcon={<SupervisedUserCircleIcon />}
				>
					{getCurrentUser().username}
				</Button>
			</Box>
		)
	)
}

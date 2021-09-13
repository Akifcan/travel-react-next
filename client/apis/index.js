export const controlFileType = type => {
	if (type.includes('image/')) return true
	else return false
}

export const setObjectStore = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value))
}

export const deleteObjectStore = key => {
	localStorage.removeItem(key)
}

export const getObjectStore = value => {
	return JSON.parse(localStorage.getItem(value))
}

export const getCurrentUser = () => {
	return localStorage.user ? JSON.parse(localStorage.user) : null
}

export const logoutUser = () => {
	deleteObjectStore('user')
}

export const getPins = async () => {
	const response = await fetch(`${process.env.BASE_URL}/pins`)
	const json = await response.json()
	return json
}

export const registerApi = async ({ email, password, username }) => {
	try {
		const response = await fetch(`${process.env.BASE_URL}/users/register`, {
			headers: { 'content-type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({ email, password, username })
		})
		const json = await response.json()
		console.log(json)
		if (response.status == 201) {
			return {
				data: json,
				status: true
			}
		} else {
			return {
				message: json.message,
				status: false
			}
		}
	} catch (error) {
		return {
			status: false,
			message: 'Unexcepted error'
		}
	}
}

export const getAvatar = () => {
	return process.env.STATIC_URL + getCurrentUser().avatar
}

export const getStaticURL = process.env.STATIC_URL

export const loginApi = async ({ email, password }) => {
	try {
		const response = await fetch(`${process.env.BASE_URL}/users/login`, {
			headers: { 'content-type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({ email, password })
		})
		const json = await response.json()
		if (response.status == 201) {
			return {
				data: json,
				status: true
			}
		} else {
			return {
				message: json.message,
				status: false
			}
		}
	} catch (error) {
		return {
			status: false,
			message: 'Unexcepted error'
		}
	}
}

export const addNewPlace = async place => {
	const response = await fetch(`${process.env.BASE_URL}/pins`, {
		headers: { 'content-type': 'application/json' },
		method: 'POST',
		body: JSON.stringify(place)
	})
	return response.status
}

export const changeProfilePhoto = async file => {
	const formData = new FormData()
	formData.append('avatar', file)
	formData.append('userId', getCurrentUser()._id)
	const response = await fetch(`${process.env.BASE_URL}/users/upload-profile-photo`, {
		method: 'POST',
		body: formData
	})
	const json = await response.text()
	console.log(json)
}

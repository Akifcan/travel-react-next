export const setObjectStore = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const deleteObjectStore = (key) => {
    localStorage.removeItem(key)
}

export const getObjectStore = (key, value) => {
    return JSON.parse(localStorage.getItem(key))
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
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
        console.log(json);
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


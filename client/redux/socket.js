import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')

socket.on('connect', _ => {
	console.log('socket connect!')
})

export default socket

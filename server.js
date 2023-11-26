import "dotenv/config"
import { Server } from "socket.io"
import HTTPserver from "./src/app.js"
import { manageUserEvents } from "./src/sockets/userEvents.js"
import { manageMessageEvents } from "./src/sockets/messageEvents.js"

// the port is obtained from a Environmental Variable
const PORT = process.env.PORT

// inicializing the server at the specified port 
HTTPserver.listen(PORT, () => {
    console.log(`Server listening to requests. [ PORT ${PORT} ]`)
})

// starting the WebSockets communication and allowing contact with some URLs
const io = new Server(HTTPserver, { 
    cors: {
        origin: "http://localhost:5173"
    }
})

// connection eventListener, if a socket is connected, it may execute the actions of the API
io.on('connection', (socket) => {

    console.log(`A client has connected: [ ${socket.id} ]`)

    manageUserEvents(io, socket)
    manageMessageEvents(io, socket)

    // disconnection eventListener
    socket.on('disconnect', (reason) => {
        console.log(`A client has disconnected: [ ${socket.id} - ${reason} ]`)
    })

})

import UserController from '../controllers/UserController.js'
import MessageController from '../controllers/MessageController.js'

// this function manages all the message socket events of the application
function manageMessageEvents(io, socket){

    socket.on('join_chat', async (userEmail1, userEmail2, returnMessages) => {

        const user1 = await UserController.findUserByEmail(userEmail1)
        const user2 = await UserController.findUserByEmail(userEmail2)

        const users = [user1.name, user2.name].sort()
        const roomName = `room${users[0]}-${users[1]}`

        socket.join(roomName)

        const messages = await MessageController.listMessages(user1, user2)

        returnMessages(messages)
        console.log(`Someone joined a chat [ ${roomName} ]`)
    })

    socket.on('send_message', async (senderEmail, recipientEmail, text) => {

        const sender = await UserController.findUserByEmail(senderEmail)
        const recipient = await UserController.findUserByEmail(recipientEmail)
        
        const users = [sender.name, recipient.name].sort()
        const roomName = `room${users[0]}-${users[1]}`

        const result = await MessageController.sendMessage(text, sender, recipient)

        if (result) {
            socket.to(roomName).emit('message_sent_successfully', result)
            console.log(`Message sent successfully by ${sender.name}`)
        } else {
            socket.emit('failed_sending_message', text)
            console.log(`Failed sending message [ ${sender.name} ]`)
        }
    })

}

export { manageMessageEvents }
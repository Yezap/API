import UserController from '../controllers/UserController.js'
import MessageController from '../controllers/MessageController.js'

// this function manages all the user socket events of the application
function manageUserEvents(io, socket){
       
    // addUser eventListener, it creates user if the given email is not used yet and emits an different event for success case or failure cases
    socket.on('add_user', async ({ name, email, password, image }) => {
        const userExists = (await UserController.findUserByEmail(email)) !== null
    
        if (userExists) {
            socket.emit('user_exists', email)
            console.log('User already exists')
        } else {
            const result = await UserController.addUser(name, email, password, image)
    
            if (result) {
                socket.emit('user_added_sucessfully', name)
                console.log('User created sucessfully')
            } else {
                socket.emit('failed_adding_user', name)
                console.log('Failed creating user')
            }
        }
    })

    // listUsers eventListener, it lists all the app users and sends the result on a callback function
    socket.on('list_users', async (sendUsers) => {
        const users = await UserController.listUsers()

        sendUsers(users)
        console.log('Listing users...')
    })

    // listUsersByName eventListener, it lists the users whose name first letters contains the searched characters and sends the result on a callback function
    socket.on('list_users_by_name', async (searchedName, sendUsers) => {
        const users = await UserController.findUsersByName(searchedName)

        sendUsers(users)
        console.log(`Finding users by name [ ${searchedName} ]`)
    })

    // listUserByEmail eventListener, it returns the user whose email matches the search on a callback function
    socket.on('list_user_by_email', async (email, sendUser) => {
        const user = await UserController.findUserByEmail(email)

        sendUser(user)
        console.log(`Finding users by email [ ${email} ]`)
    })

    // updateUser eventListener, it updates a user and emits success and failure events
    socket.on('update_user', async (updated) => {

        await MessageController.updateUserMessages(updated)

        const result = await UserController.updateUser(updated)

        if (result.modifiedCount) {
            socket.emit('user_updated_successfully', result)
            console.log('User updated successfully')
        } else {
            socket.emit('failed_updating_user', result)
            console.log('Failed updating user')
        }
    })

    // deleteUser eventListener, it deletes a user and all its messages and emits success and failure events
    socket.on('delete_user', async (email) => {
        const userMessages = await MessageController.listUserMessages(UserController.findUserByEmail(email))

        await Promise.all(userMessages.map(async (userMessage) => {
            MessageController.deleteMessage(userMessage.id)
        }))

        const result = await UserController.deleteUser(email)

        if (result.deletedCount) {
            socket.emit('user_deleted_successfully', email)
            console.log('User deleted successfully')
        } else {
            socket.emit('failed_deleting_user', email)
            console.log('Failed deleting user')
        }
    })
}

export { manageUserEvents }
import { message } from "../models/Message.js"
import UserController from "./UserController.js"

// this class is responible to manage the MongoDB Message Collection data
// created by Davi Piassi
// last update: 2023, November, 26
class MessageController {
  
  static async listMessages(user1, user2) {
    try {
      const messages = await message.find({
        $or: [
          { 
            recipient: user1, 
            sender: user2
          },
          { 
            recipient: user2,
            sender: user1
          }
        ]
      }).sort({time: 'asc'})
      return messages

    } catch(err) {
      console.log("Failed while listing the contact messages: " + err)
    }
  }

  // method that lists all user messages (as recipient or sender)
  static async listUserMessages(user) {
    try {
      const messages = await message.find({
        $or: [
          { recipient: user },
          { sender: user }
        ]
      })
      return messages

    } catch(err) {
      console.log("Failed while listing the user messages: " + err)
    }
  }

  static async sendMessage(text, sender, recipient) {
    try {
      const result = await message.insertOne({
        time: new Date().getTime(),
        text: text,
        sender: sender,
        recipient: recipient
      })
      return result

    } catch(err) {
      console.log("Failed while sending the message: " + err)
    }
  }

  static async updateUserMessages(updated) {
    try {

      const user = await UserController.findUserByEmail(updated.email)

      await message.updateMany({
        recipient: user
      },
      {
        $set: {
          recipient: updated
        }
      })
      await message.updateMany({
        sender: user
      },
      {
        $set: {
          sender: updated
        }
      })
    } catch(err) {
      console.log("Failed while updating user messages: " + err)
    }
  }

  static async deleteMessage(id) {
    try {
      const result = user.deleteOne({
        _id: id
      })
      return result

    } catch(err){
      console.log("Failed while deleting the message: " + err)
    }
  }
}

export default MessageController

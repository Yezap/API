import { user } from "../models/User.js"

// this class is responible to manage the MongoDB User Collection data
// created by Davi Piassi
// last update: 2023, November, 26
class UserController {

  // method that lists all registered users at MongoDB User Collection
  static async listUsers() {
    try {
      const users = await user.find()
      return users

    } catch(err) {
      console.log("Failed while listing users: " + err)
    }
  }

  // method that receives user data and creates user document at MongoDB User Collection
  static async addUser(name, email, password, image) {
    try {
      const result = await user.create({
        name: name,
        email: email,
        password: password,
        image: image
      })
      return result

    } catch(err) {
      console.log("Failed while creating user: " + err)
    }
  }

  // method that receives a searchedName or a part of it and finds the registered users whose name first letters contains the search
  static async findUsersByName(search) {
    try {
      const usersFound = await user.find({
        name: { $regex: `^${search}`, $options: 'i' }
      })
      return usersFound

    } catch(err) {
      console.log("Failed while finding the users by name: " + err)
    }
  }

  // method that finds a user by a given email at the MongoDB User Collection
  static async findUserByEmail(email) {
    try {
      const userFound = await user.findOne({
        email: email
      })
      return userFound

    } catch(err) {
      console.log("Failed while finding the user: " + err)
    }
  }

  // method that updates a user with given information about the new status at the MongoBB User Collection
  static async updateUser(updatedUser) {
    try {
      const update = await user.updateOne(
        {
          email: updatedUser.email
        },
        {
          $set: {
            name: updatedUser.name,
            password: updatedUser.password,
            image: updatedUser.image
          }
        }
      )
      return update

    } catch(err) {
      console.log("Failed while updating the user: " + err)
    }
  }

  // method that deletes the user document from the MongoDB Collection by the email received
  static async deleteUser(email) {
    try {
      const result = await user.deleteOne({
        email: email
      })
      return result

    } catch(err) {
      console.log("Failed while deleting user: " + err)
    }
  }

}

export default UserController
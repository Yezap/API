import mongoose from "mongoose"

// creating the connection with the MongoDB database
async function connectDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING)
    return mongoose.connection
}

export default connectDatabase
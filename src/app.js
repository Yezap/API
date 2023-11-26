import express from "express"
import http from "http"
import connectDatabase from "./config/dbConnect.js"

// connecting with the MongoDB database
const connection = await connectDatabase()

// if the connection fails, a message with the reason is shown
connection.on("error", (err) => {
    console.error("Database connection error: ", err)
})

// if the connection occurs successfully, a message is shown
connection.once("open", () => {
    console.log("Database connection was successfully done!")
})

// creating the express application and transforming it on a HTTP Server just in case WebSockets Protocol fails
const app = express()
const HTTPserver = http.createServer(app)

export default HTTPserver
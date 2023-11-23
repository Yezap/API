import express from "express";
import connectDatabase from "./config/dbConnect.js";

const connection = await connectDatabase()

connection.on("error", (err) => {
    console.error("Database connection error: ", err)
})

connection.once("open", () => {
    console.log("Database connection was successfully done!")
})

const app = express()

export default app
import mongoose from "mongoose";
import { userSchema } from "./User.js";

// creating the message structure at MongoDB Message Collection
const messageSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    time: { type: Date, required: true },
    text: { type: String, required: true },
    sender: userSchema,
    recipient: userSchema
}, { versionKey: false })

const message = mongoose.model("messages", messageSchema)

export { message } 
import mongoose from "mongoose";


// creating the user structure at MongoDB User Collection
const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: Number }
}, { versionKey: false })

const user = mongoose.model("users", userSchema)

export { user, userSchema }
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userId:
    {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Staff", "Student"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    }
})
const userModel = mongoose.model("users", userSchema);
export default userModel;
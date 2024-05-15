import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
    userId:
    {
        type: Number,
        required: true
    },
    date:
    {
        type: Number,
        required: true
    },
    month:
    {
        type: String,
        required: true
    },
    reason:
    {
        type: String,
        required: true
    }
})
const leaveModel = mongoose.model("leave", leaveSchema);
export default leaveModel;
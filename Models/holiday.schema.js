import mongoose from "mongoose";

const holidaySchema = mongoose.Schema({
    date:
    {
        type: Number,
        required: true
    },
    reason:
    {
        type: String,
        required: true
    }
})
const holidayModel = mongoose.model("holidays", holidaySchema);
export default holidayModel;
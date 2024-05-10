import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import holidayModel from "../Models/holiday.schema.js";
import leaveModel from "../Models/leave.schema.js";
configDotenv()
export const applyHoliday = async (req, res) => {
    try {
        const jwtValue = req.headers.authorization.slice(7)
        const userData = jwt.verify(jwtValue, process.env.SECRET_KEY)
        if (userData.role === "Staff") {
            let holidayData = []
            for (let i = 0; i < req.body.selectedDates.length; i++) {
                const deletedLeave = await leaveModel.deleteMany({ date: req.body.selectedDates[i] })
                console.log(deletedLeave)
                holidayData.push({
                    date: req.body.selectedDates[i],
                    reason: req.body.reason,
                })
            }
            holidayModel.insertMany(holidayData).then(() => {
                res.status(200).json({ msg: "Holiday applied Successfully" })
            }).catch(() => {
                res.status(403).json({ msg: "Error accured while holiday appling" })
            })
        }
    } catch {
        res.status(403).json({ msg: "Unknown Error accured while holiday appling" })
    }
}
export const getHolidayList = (req, res) => {
    try {
        const jwtValue = req.headers.authorization.slice(7)
        jwt.verify(jwtValue, process.env.SECRET_KEY)
        holidayModel.find({}).then((result) => {
            let holidayList = {}
            result.forEach((holiday) => holidayList[holiday.date] = holiday.reason)
            res.status(200).json({ msg: "Holiday List fetched successfully", holidayList })
        }).catch((result) => {
            res.status(403).json({ errMsg: "Error occured", result })

        })

    }
    catch {
        res.status(403).json({ errMsg: "Error occured" })
    }
}
export const getHolidayCount = async (req, res) => {
    const jwtValue = req.headers.authorization.slice(7)
    try {
        jwt.verify(jwtValue, process.env.SECRET_KEY)
        const takenCount = await holidayModel.countDocuments({ date: { $lte: new Date().getTime() } })
        const requestCount = await holidayModel.countDocuments({ date: { $gt: new Date().getTime() } })
        res.status(200).json({ msg: "Data fetched successfully", takenCount, requestCount })
    } catch {
        res.status(400).json({ errMsg: "Error accured" })
    }
}

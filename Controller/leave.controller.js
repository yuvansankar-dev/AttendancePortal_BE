import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import leaveModel from "../Models/leave.schema.js";
configDotenv()
export const applyLeave = (req, res) => {
    try {
        const jwtValue = req.headers.authorization.slice(7)
        jwt.verify(jwtValue, process.env.SECRET_KEY)
        const leaveData = req.body.selectedDates.map((epochValue) => {
            const monthName = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ][new Date(epochValue).getMonth()]
            return {
                userId: req.body.userId,
                date: epochValue,
                month: monthName,
                reason: req.body.reason,
            }
        })
        leaveModel.insertMany(leaveData).then(() => {
            res.status(200).json({ msg: "Leave applied Successfully" })
        }).catch(() => {
            res.status(403).json({ msg: "Error accured while leave appling" })
        })
    } catch {
        res.status(403).json({ msg: "Unknown Error accured while leave appling" })
    }
}
export const getLeaveList = (req, res) => {
    try {
        const jwtValue = req.headers.authorization.slice(7)
        jwt.verify(jwtValue, process.env.SECRET_KEY)
        leaveModel.find({ userId: req.params.userId }).then((result) => {
            let leaveList = {}
            result.forEach((leave) => leaveList[leave.date] = leave.reason)
            res.status(200).json({ msg: "Leave List fetched successfully", leaveList })
        }).catch((result) => {
            res.status(403).json({ errMsg: "Error occured", result })

        })

    }
    catch {
        res.status(403).json({ errMsg: "Error occured" })
    }
}
export const getLeaveCount = async (req, res) => {
    const jwtValue = req.headers.authorization.slice(7)
    const userDetail = jwt.verify(jwtValue, process.env.SECRET_KEY)
    if (userDetail.userId === req.params.userId) {
        const takenCount = await leaveModel.countDocuments({ userId: req.params.userId, date: { $lte: new Date().getTime() } })
        const requestCount = await leaveModel.countDocuments({ userId: req.params.userId, date: { $gt: new Date().getTime() } })
        console.log(takenCount, requestCount)
        res.status(200).json({ msg: "Data fetched successfully", takenCount, requestCount })
    }
    else {
        res.status(400).json({ errMsg: "Error accured" })

    }
}
export const getMonthlyLeaveCount = async (req, res) => {
    try {
        const jwtValue = req.headers.authorization.slice(7)
        const userDetail = jwt.verify(jwtValue, process.env.SECRET_KEY)
        leaveModel.aggregate([
            {$match:{date: { $lte: new Date().getTime() }}},
            {
                $group: { _id: "$month", totalLeaveCount: { $sum: 1 } }
            }
        ]).then((result) => {
            console.log(result)
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            let leaveList = {}
            result.forEach((leave) => leaveList[leave._id] = leave.totalLeaveCount)
            leaveList = monthNames.map((month) => {
                return leaveList[month] ?? 0
            })
            res.status(200).json({ msg: "Leave List fetched successfully", leaveList })
        }).catch((result) => {
            res.status(403).json({ errMsg: "Error occured", result })

        })

    }
    catch {
        res.status(403).json({ errMsg: "Error occured" })
    }
}
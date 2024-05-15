import express from "express";
import { applyLeave, getLeaveCount, getLeaveList, getMonthlyLeaveCount } from "../Controller/leave.controller.js";
const leaveRouter = express.Router()
leaveRouter.post("/apply", applyLeave)
leaveRouter.get("/list/:userId", getLeaveList)
leaveRouter.get("/count/:userId", getLeaveCount)
leaveRouter.get("/monthlyCount", getMonthlyLeaveCount)

export default leaveRouter;
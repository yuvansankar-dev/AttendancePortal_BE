import express from "express";
import { applyHoliday, getHolidayCount, getHolidayList } from "../Controller/holiday.controller.js";
const holidayRouter = express.Router()
holidayRouter.post("/apply", applyHoliday)
holidayRouter.get("/list", getHolidayList)
holidayRouter.get("/count", getHolidayCount)
export default holidayRouter;
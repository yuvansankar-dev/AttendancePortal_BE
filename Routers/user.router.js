import express from "express";
import { createUser, getUserList, loginUser, verifyUser } from "../Controller/user.controller.js";
const userRouter = express.Router()
userRouter.post("/register", createUser)
userRouter.post("/login", loginUser)
userRouter.get("/verify", verifyUser)
userRouter.get("/list", getUserList)
export default userRouter;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Models/user.schema.js";
import { configDotenv } from "dotenv";
configDotenv()
export const createUser = async (req, res) => {
    try {
        const findUser = await userModel.find({ userId: req.body.userId })
        if (!findUser.length) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const userData = await new userModel(req.body);
            await userData.save();
            res.status(200).json({ msg: "User Created Successfully" })
        }
        else {
            res.status(400).json({ errMsg: "User already register with same User ID" })
        }
    }
    catch {
        res.status(400).json({ errMsg: "User Creation failed" })
    }
}
export const loginUser = async (req, res) => {
    try {
        const findUser = await userModel.find({ userId: req.body.userId })
        if (findUser.length) {
            const correctPassword = await bcrypt.compare(req.body.password, findUser[0].password)
            if (correctPassword) {
                const { password, ...userInfo } = findUser[0]["_doc"]
                const jwtValue = jwt.sign(userInfo, process.env.SECRET_KEY)
                res.status(200).json({ msg: "Valid User", jwt: jwtValue, userData: userInfo })
                return;
            }
            else {
                res.status(400).json({ errMsg: "Incorrect Password" })
                return;
            }
        }
        res.status(404).json({ errMsg: "User Not found" })
    }
    catch {
        res.status(403).json({ errMsg: "Can't able to fetch user data" })

    }
}
export const verifyUser = async (req, res) => {
    try {
        const jwtValue = req.headers.authorization.slice(7)
        const userData = jwt.verify(jwtValue, process.env.SECRET_KEY)
        res.status(200).json({ msg: "Valid user", userData })
    }
    catch {
        res.status(403).json({ msg: "Invalid user" })
    }
}
export const getUserList = (req, res) => {
    try {
        const jwtValue = req.headers.authorization.slice(7)
        const userData = jwt.verify(jwtValue, process.env.SECRET_KEY)
        if (userData.role === "Staff") {
            userModel.find({ role: "Student" }, { userId: 1, firstName: 1, lastName: 1 }).then((result) => {
                console.log(result);
                let studentsData = {}
                result.forEach((stu) => studentsData[stu.userId] = `${stu.firstName} ${stu.lastName}`)
                res.status(200).json({ msg: "Student Data fetched", studentsData });
            }).catch((result) => {
                res.status(403).json({ errMsg: "Can't able to fetch" })
            })
        }
    }
    catch {
        res.status(403).json({ msg: "Invalid user" })
    }
}
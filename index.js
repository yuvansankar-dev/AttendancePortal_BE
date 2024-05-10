import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./Routers/user.router.js";
import { connectDB } from "./Database/config.js";
import leaveRouter from "./Routers/leave.router.js";
import holidayRouter from "./Routers/holiday.router.js";
const app = express();
app.use(cors({
  origin: 'https://genuine-basbousa-94a381.netlify.app', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));
app.use(express.json())
configDotenv()
connectDB();

app.listen(process.env.PORT, () => {
    console.log("App is ready to listen the port", process.env.PORT)
})
app.use("/user", userRouter)
app.use("/leave", leaveRouter)
app.use("/holiday", holidayRouter)

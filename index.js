import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./Routers/user.router.js";
import { connectDB } from "./Database/config.js";
import leaveRouter from "./Routers/leave.router.js";
import holidayRouter from "./Routers/holiday.router.js";
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests only from this origin
  methods: ['GET', 'POST'], // Allow only these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
  credentials: true // Enable credentials (cookies) to be sent with requests
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

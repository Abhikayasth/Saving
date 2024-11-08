import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config();

console.log(process.env.CORS_ORIGIN)
const app = new express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import transactionRouter from "./routes/transaction.route.js"

app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

export {app}
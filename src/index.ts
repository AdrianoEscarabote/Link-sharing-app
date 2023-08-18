// database
import { startApp } from "./config/database"
startApp()

// express
import express from "express"
import { Request, Response, NextFunction } from "express"

// env
import * as env from "dotenv"
env.config()

// cookie-parser
import cookieParser from "cookie-parser"

// cors
import cors from "cors"
const app = express()
// configures the color to allow only one origin
const corsOptions = {
  credentials: true,
  origin: "https://link-sharing-app-alpha.vercel.app",
}

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://link-sharing-app-alpha.vercel.app",
  )
  res.header("Access-Control-Allow-Credentials", "true")
  next()
})

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!")
})

// auth
import authRouter from "./routes/authRouter"
app.use("/auth", authRouter)

// profile
import profileRouter from "./routes/profileRouter"
app.use("/profile", profileRouter)

app.listen(4002, () => {
  console.log("Servidor iniciado em http://localhost:4002")
})

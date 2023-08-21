// database
import { startApp } from "./config/database"

// express
import express from "express"
import { Request, Response, NextFunction } from "express"

// env
import { config } from "dotenv"

// cookie-parser
import cookieParser from "cookie-parser"

// cors
import cors from "cors"

// configures the cors to allow only one origin
const corsOptions = {
  credentials: true,
  origin: "https://link-sharing-app-alpha.vercel.app",
}

// auth
import authRouter from "./routes/authRouter"

// profile
import profileRouter from "./routes/profileRouter"

const main = async () => {
  config()

  const app = express()

  app.use(express.json())

  await startApp()

  app.use(cors(corsOptions))
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://link-sharing-app-alpha.vercel.app",
    )
    res.header("Access-Control-Allow-Credentials", "true")
    next()
  })
  app.use(cookieParser())

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
  })

  app.use("/auth", authRouter)

  app.use("/profile", profileRouter)

  const port = 8000

  app.listen(port, () => {
    console.log("listening on port http://localhost:8000")
  })
}

main()

// env
import { config } from "dotenv"
const port = process.env.PORT || 7000

// database
import { MongoClient } from "./database/mongo"

// express
import express, { Request, Response, NextFunction } from "express"

// cookie-parser
import cookieParser from "cookie-parser"

// cors
import cors from "cors"

// configures the cors to allow only one origin
const corsOptions = {
  credentials: true,
  origin: "https://link-sharing-app-alpha.vercel.app",
}

// routers
import authRouter from "./routes/authRouter"
import profileRouter from "./routes/profileRouter"
import userLinksRouter from "./routes/userLinksRouter"
import PreviewRouter from "./routes/previewRouter"

const main = async () => {
  config()

  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://link-sharing-app-alpha.vercel.app",
    )
    res.header("Access-Control-Allow-Credentials", "true")
    next()
  })

  await MongoClient.connect()

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
  })

  app.use("/auth", authRouter)
  app.use("/profile", profileRouter)
  app.use("/links", userLinksRouter)
  app.use(PreviewRouter)

  app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
  })
}

main()

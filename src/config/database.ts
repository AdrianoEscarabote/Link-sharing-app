// dotenv
import * as dotenv from "dotenv"
dotenv.config()

// mongoose
import mongoose from "mongoose"

const MONGODB_URL = process.env.MONGODB_URL

mongoose.Promise = global.Promise

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose
      .connect(`${MONGODB_URL}`)
      .then(() => {
        console.log("Conectou ao banco")
      })
      .catch((err) => console.log(err))
  } catch (error) {
    console.error("Erro na conexão com o banco: " + error)
  }
}

export const startApp = async (): Promise<void> => {
  try {
    await connectToDatabase()
  } catch (error) {
    console.error("Erro ao iniciar o aplicativo:", error)
  }
}

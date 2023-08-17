// dotenv
import * as dotenv from "dotenv"
dotenv.config()

// mongoose
import mongoose from "mongoose"

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.Promise = global.Promise

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hm1yjmm.mongodb.net/?retryWrites=true&w=majority`,
      )
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

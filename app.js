require("dotenv").config();
require("./config/database");
const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const checkToken = require("./src/middlewares/checktoken");
const cookieParser = require("cookie-parser");
const app = express();

// Config JSON response
app.use(express.json());

// configura a cors para permitir todas as origens
const corsOptions = { credentials: true, origin: "https://localhost:5427" };
app.use(cors(corsOptions));

// cookie parser
app.use(cookieParser());

// Models
const User = require("./src/models/User");

// Open route - public route
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Bem vindo a nossa api",
  });
});

// auth router
const authRouter = require("./src/routes/auth");
app.use("/auth", authRouter);

// profile router
const profileRouter = require("./src/routes/profile");
app.use("/profile", profileRouter);

// Private route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // check if users exists
  const user = await User.findById(id, "-email -password");

  if (!user) {
    return res.status(404).json({
      msg: "Usuario não encontrado!",
    });
  }

  res.status(200).json({ user });
});

const privateKey = fs.readFileSync("./https_cert/localhost-key.pem", "utf-8");
const certificate = fs.readFileSync("./https_cert/localhost.pem", "utf-8");
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 3000;

httpsServer.listen(PORT, () => {
  console.log(`Servidor HTTPS em execução na porta ${PORT}`);
});

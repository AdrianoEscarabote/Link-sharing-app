require("dotenv").config();
require("./config/database");
const express = require("express");
const cors = require("cors");
const checkToken = require("./src/middlewares/checktoken");
const app = express();

// Config JSON response
app.use(express.json());

// configura a cors para permitir todas as origens
app.use(cors());

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

app.listen(3000, () => {
  console.log("servidor foi iniciado!");
});

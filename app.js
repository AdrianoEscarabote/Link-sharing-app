require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Models
const User = require("./src/models/User");

// Config JSON response
app.use(express.json());

// configura a cors para permitir todas as origens

app.use(cors());

// Open route - public route
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Bem vindo a nossa api",
  });
});

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

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido!" });
  }
}

// Register User

app.post("/auth/register", async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  // validations

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: "A senha e a confirmação precisam ser iguais!" });
  }

  // check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    email,
    password: passwordHash,
  });

  try {
    await user.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Login User
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O email está errado!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha está errada!" });
  }

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "usuario não encontrado" });
  }

  // check if password match

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha invalida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res
      .status(200)
      .json({ msg: "Autentificação realizada com sucesso!", token });
  } catch (e) {
    return res.send(500).json({
      mesg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hm1yjmm.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectou ao banco");
  })
  .catch((err) => console.log(err));

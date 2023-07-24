const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

router.post("/register", async (req, res) => {
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

    res.status(201).json({ success: true, _id: user._id });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Login User
router.post("/login", async (req, res) => {
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

    res.status(200).json({
      msg: "Autentificação realizada com sucesso!",
      token,
      _id: user._id,
    });
  } catch (e) {
    return res.send(500).json({
      mesg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
});

module.exports = router;

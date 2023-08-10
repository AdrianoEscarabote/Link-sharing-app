const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");
const checkToken = require("../middlewares/checktoken");

router.post("/register", async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  // validations

  if (!email) {
    return res.status(422).json({ msg: "email is required!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "password is required!" });
  }

  if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: "Password and confirmation must match!" });
  }

  // check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Please use another email!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    email,
    password: passwordHash,
  });

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  try {
    await user.save();

    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.cookie("id", user._id, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: expirationDate,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: expirationDate,
    });

    res.status(201).json({ success: true, _id: user._id });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "The email is wrong!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "The password is wrong!" });
  }

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "User does not exist!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Invalid password!" });
  }

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.cookie("id", user._id, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: expirationDate,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: expirationDate,
    });

    return res.status(200).json({
      msg: "Authentication successful!",
      _id: user._id,
      token: token,
    });
  } catch (e) {
    return res.send(500).json({
      mesg: "There was a server error, please try again later!",
    });
  }
});

router.post("/logout", checkToken, async (req, res) => {
  try {
    const id = req.cookies.id;

    const user = await User.findById(id, "-password -email");

    if (!user) {
      return res.status(400).json({
        msg: "user is not present in the database!",
      });
    }

    res.clearCookie("id");
    res.clearCookie("token");

    return res.status(200).json({
      msg: "success!",
    });
  } catch (error) {
    return res.status(500).json({ msg: "server error!" });
  }
});

router.get("/checkToken", async (req, res) => {
  try {
    const token = req.cookies.token;
    const id = req.cookies.id;

    if (!token && !id) {
      return res.status(404).json({
        msg: "error!",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "error!" });
    }

    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    // Retorna os detalhes do usuário
    return res.status(200).json({
      msg: "success",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Invalid token!" });
  }
});

module.exports = router;

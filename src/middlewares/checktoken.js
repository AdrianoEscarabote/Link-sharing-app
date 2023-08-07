const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("valor do token", token);
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

module.exports = checkToken;

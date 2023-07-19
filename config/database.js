const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hm1yjmm.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectou ao banco");
  })
  .catch((err) => console.log(err));

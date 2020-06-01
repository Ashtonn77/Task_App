const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const bcrypt = require("bcrypt");

const hash1 = async () => {
  let password = "ash123";
  let hashed = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashed);

  const isMatch = await bcrypt.compare("ash1523", hashed);

  console.log(isMatch);
};

hash1();

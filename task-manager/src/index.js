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

const jwt = require("jsonwebtoken");

const test = async () => {
  const token = jwt.sign({ _id: "124578" }, "thisismyfirsttime", {
    expiresIn: "7 days",
  });

  const data = jwt.verify(token, "thisismyfirsttime");
  console.log(data);
};

test();

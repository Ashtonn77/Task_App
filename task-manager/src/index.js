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

const Task = require("./models/task");
const User = require("./models/user");
const main = async () => {
  // const task = await Task.findById("5edfd26a0d47a632d0ff8b20");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);

  const user = await User.findById("5edfd007cc9328316f5f99c2");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();

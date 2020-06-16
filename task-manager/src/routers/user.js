const express = require("express");
const User = require("../models/user.js");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

//users
//create
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//verify details
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken(); //use lower case user because we want to target a single user, the one that signed in/up

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

//logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//logoutAll

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//read
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//update
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res
      .status(400)
      .send({ error: "Invalid operation...update not allowed" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a jpg, jpeg or png file"));
    }
    return cb(undefined, true);
  },
});

//add profile pic
router.post("/users/me/avatar", upload.single("avatar"), async (req, res) => {
  await res.send();
});

module.exports = router;

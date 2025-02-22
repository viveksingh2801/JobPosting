const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);
    const { name, email, mobile, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.json({ messsage: "User Added Successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Unable to save the user. Reason: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    }

    const token = await user.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successfull");
});

module.exports = authRouter;

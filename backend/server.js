const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./src/routes/auth");
const jobRouter = require("./src/routes/job");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// app.use(
//   cors({
//     origin: "https://jobposting-frontend-t4io.onrender.com",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", authRouter);
app.use("/", jobRouter);

connectDB()
  .then(() => {
    console.log("Database connection establish...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.error("Database cannot be connected!!");
  });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const githubRoutes = require("./routes/github.routes");
const authRoutes = require("./routes/user-model-routes/auth.routes");
const userRoutes = require("./routes/user-model-routes/user.routes");
// const analysisRoutes = require("./routes/analysis.routes");

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://devstack.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/github", githubRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// app.use("/api/analysis", analysisRoutes);

module.exports = app;

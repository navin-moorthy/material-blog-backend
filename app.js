const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

// DB Connection
mongoose
  .connect(process.env.MONGOCLIENT, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully Connected to the Database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

// To supress deprication warning
mongoose.set("useCreateIndex", true);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "./images")));
app.use("/", express.static(path.join(__dirname, "./angularmean")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, POST, PATCH, DELETE, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angularmean/index.html"));
});
module.exports = app;

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5001;
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routers/usersRouter");
const recordsRouter = require("./routers/recordsRouter");
const imagesRouter = require("./routers/imagesRouter");
const ordersRouter = require("./routers/ordersRouter");
const cookiesParser = require('cookie-parser')

// VARIABLES

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const db_name = process.env.DB_NAME;

// EXPRESS SETUP

app.listen(PORT, () => {
  console.log(`app listens at localhost:${PORT}`);
});

app.use(express.json());
app.use(cors());
app.use(cookiesParser());
app.use("/statics", express.static("statics"));

// DB CONNECTION

const strConn = `mongodb+srv://${user}:${password}@cluster0.dkalb.mongodb.net/${db_name}?retryWrites=true&w=majority`;

mongoose
  .connect(strConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect to central db successfully"))
  .catch((err) => console.log("[ERROR] DB connection failed"));

// API ROUTES

app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/images", imagesRouter);
app.use("/orders", ordersRouter);

// EXPRESS ERROR HANDLER

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});

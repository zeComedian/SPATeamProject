const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require('@routes/route-user');
const newsRoutes = require('@routes/route-news');
const categoryRoutes = require('@routes/route-category');
const commentRoutes = require('@routes/route-comment');
const configRoutes = require('@routes/route-config');

const ENV = require('@constants/environment');
const CODES = require('@constants/http-codes');
const MSGS = require('@constants/mesages');

mongoose.connect(
  `mongodb://${ENV.DB_USER}:${ENV.DB_PASSWORD}@ds137404.mlab.com:37404/news_spa`,
  {
    poolSize: 2,
    reconnectTries: 5,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    promiseLibrary: global.Promise,
  },err => {
    if (err) console.log(`Oops.. You suck dick, because: ${err}! My congratulations!`);
  }
);

// Default configuration
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.end();
  }
  next();
});


// Routes which should handle requests
app.use("/config", configRoutes);

app.use("/user", userRoutes);
app.use("/news", newsRoutes);
app.use("/category", categoryRoutes);
app.use("/comment", commentRoutes);

// Error handlers
app.use(function(req, res, next) {
  res.status(CODES.EC_NOT_FOUND).json({
    message: MSGS.NOT_FOUND
  });
});

app.use((error, req, res) => {
  res.status(error.status || CODES.ES_INTERNAL);
  res.json({
    message: error.message
  });
});

module.exports = app;

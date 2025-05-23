const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
//const authenticateMiddleware = require('../Online-Event-Ticketing-System/Middleware/authenticateMiddleware'); 

const app = express();
const cors = require("cors"); // haga 3ashan el security, middle ware block request if the localhost is different
app.use(cookieParser());

// this is connecting routes with middleware
const authRouter = require("./Routes/auth");
const bookingRouter = require("./Routes/booking");
const eventRouter = require("./Routes/event");
const userRouter = require("./Routes/user");
// here we apply the middleware
require('dotenv').config(); // this loads from .env file to your app
app.use(express.json()); // parse from the post req
app.use(express.urlencoded({ extended: false })); //parse from the html
app.use(cookieParser()); // we can access token


app.use(
    cors({
      origin: process.env.ORIGIN,
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
  
  app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
  

  
  
  app.use("/api/v1", authRouter);
  
  app.use("/api/v1/bookings", bookingRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/events", eventRouter);
  
  const db_name = process.env.DB_NAME;

  const cloud_db_url = `mongodb+srv://amr:Amr.2024Khalil@softwareproject.4sngn.mongodb.net/${db_name}?retryWrites=true&w=majority`;

  const db_url = `${process.env.DB_URL}/${db_name}`; // if it gives error try to change the localhost to 127.0.0.1
   //const local = "mongodb://localhost:27017/testdb"
  // ! Mongoose Driver Connection
  mongoose
    .connect(db_url)
    .then(() => console.log("mongoDB connected"))
    .catch((e) => {
      console.log(e);
    });
  app.use(function (req, res, next) {
    return res.status(404).send("404");
  });
  app.listen(process.env.PORT, () => console.log("server started"));
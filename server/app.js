const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewear/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "server/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const Product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentroute");

app.use("/api/v1", Product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
// middlewear error
app.use(errorMiddleware);

module.exports = app;

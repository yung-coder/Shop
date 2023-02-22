const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewear/error");

app.use(express.json());
app.use(cookieParser());

const Product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", Product);
app.use("/api/v1", user);
app.use("/api/v1", order);
// middlewear error
app.use(errorMiddleware);

module.exports = app;

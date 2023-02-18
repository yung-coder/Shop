import express from "express";
import { Customerror } from "./middlewear/error.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

import Product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";

app.use("/api/v1", Product);
app.use("/api/v1", user);
// middlewear error
app.use(Customerror);

export default app;

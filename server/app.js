import express from "express";
import { Customerror } from "./middlewear/error.js";

const app = express();
app.use(express.json());

import Product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";

app.use("/api/v1", Product);
app.use("/api/v1", user);
// middlewear error
app.use(Customerror);

export default app;

import express from "express";

const app = express();
app.use(express.json());

import Product from "./routes/productRoute.js";

app.use("/api/v1", Product);

export default app;
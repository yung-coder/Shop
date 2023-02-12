import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "server/config/config.env" });

//import routes from './routes';

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

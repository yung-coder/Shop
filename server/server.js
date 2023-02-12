import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/Database.js";

// handling uncaugth exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down uncaught exception`);
  process.exit(1);
});

dotenv.config({ path: "server/config/config.env" });

//import routes from './routes';

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// unandled rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server`);

  server.close(() => {
    process.exit();
  });
});

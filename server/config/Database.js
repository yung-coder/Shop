import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongo db is connected");
    })
    .catch((error) => console.log(`${error} did not connect`));
};

export default connectDatabase;

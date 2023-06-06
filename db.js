import mongoose from "mongoose";

const dbRemote =
  "mongodb+srv://tigranpetrosyants:uyZBwEFh6cDJyLF9@cluster0.ydigebr.mongodb.net/blog?retryWrites=true&w=majority";

function connectToDB() {
  return mongoose
    .connect(dbRemote)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    });
}

export default connectToDB;

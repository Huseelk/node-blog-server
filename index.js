import express from "express";

import { registerValidation } from "./validations/auth.js";
import connectToDB from "./db.js";
import {
  loginUser,
  createUser,
  getUser,
} from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";

connectToDB();

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, createUser);

app.post("/auth/login", loginUser);

app.get("/auth/me", checkAuth, getUser);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running");
});

import express from "express";

import { loginValidation, registerValidation } from "./validations/auth.js";
import connectToDB from "./db.js";
import {
  loginUser,
  createUser,
  getUser,
} from "./controllers/UserController.js";

import checkAuth from "./utils/checkAuth.js";
import { createPost, deletePost, getPost, getPosts, updatePost } from "./controllers/PostController.js";
import { postCreateValidation } from "./validations/post.js";

connectToDB();

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, createUser);

app.post("/auth/login", loginValidation, loginUser);

app.get("/auth/me", checkAuth, getUser);

app.get("/posts", getPosts);

app.get("/posts/:id", getPost);

app.post("/posts", checkAuth, postCreateValidation, createPost);

app.delete("/posts/:id", checkAuth, deletePost);

app.patch("/posts/:id", checkAuth, postCreateValidation, updatePost);


app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running");
});

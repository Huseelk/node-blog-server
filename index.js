import express from "express";
import multer from "multer";

import { loginValidation, registerValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";

import connectToDB from "./db.js";

import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

import {
  loginUser,
  createUser,
  getUser,
} from "./controllers/UserController.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./controllers/PostController.js";


connectToDB();

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/auth/register", registerValidation, handleValidationErrors, createUser);

app.post("/auth/login", loginValidation, handleValidationErrors, loginUser);

app.get("/auth/me", checkAuth, getUser);

app.get("/posts", getPosts);

app.get("/posts/:id", getPost);

app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, createPost);

app.delete("/posts/:id", checkAuth, deletePost);

app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, updatePost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running");
});

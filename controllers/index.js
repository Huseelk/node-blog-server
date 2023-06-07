export {
  loginUser,
  createUser,
  getUser as UserController
} from "./controllers/UserController.js";

export {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost as PostController
} from "./controllers/PostController.js";

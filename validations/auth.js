import { body } from "express-validator";

export const registerValidation = [
  body("email", "Not vlid Email").isEmail(),
  body("password", "Password need to be more then 5 symbols").isLength({
    min: 5,
  }),
  body("fullName", "Enter the full name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid URL").optional().isURL(),
];

export const loginValidation = [
  body("email", "Not vlid Email").isEmail(),
  body("password", "Password need to be more then 5 symbols").isLength({
    min: 5,
  }),
];

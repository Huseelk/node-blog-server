import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Set title of post")
    .isLength({
      min: 3,
    })
    .isString(),
  body("text", "Set text of post")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Not valide type of tags (set array)").optional().isString(),
  body("imageUrl", "Invalid URL").optional().isString(),
];

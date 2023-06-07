import PostModel from "../models/Post.js";

async function createPost(req, res) {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't create a post",
    });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await PostModel.find();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get posts",
    });
  }
}

async function getPost(req, res) {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get post",
    });
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't remove post",
    });
  }
}

async function updatePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        $set: req.body,
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't remove post",
    });
  }
}

export { createPost, getPosts, getPost, deletePost, updatePost };

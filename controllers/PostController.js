import PostModel from "../models/Post.js";

async function createPost(req, res) {
  try {
    const doc = new PostModel({
      title: req.body.title.trim(),
      text: req.body.text.trim(),
      imageUrl: req.body?.imageUrl,
      tags: req.body?.tags && req.body?.tags.trim().split(" "),
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
    const posts = await PostModel.find()
      .sort("-date")
      .populate("user")
      .sort({ createdAt: -1 })
      .exec();

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
    )
      .populate("user")
      .exec();

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

    const { title, text, imageUrl, tags } = req.body;

    const sanitizedTitle = title?.trim();
    const sanitizedText = text?.trim();
    const sanitizedImageUrl = imageUrl;
    const sanitizedTags = tags && tags.trim().split(" ");

    if (!sanitizedTitle || !sanitizedText) {
      return res.status(400).json({ error: "Title and text are required." });
    }

    const update = {
      $set: {
        title: sanitizedTitle,
        text: sanitizedText,
      },
    };

    if (!sanitizedTags || sanitizedTags.length === 0) {
      update.$unset = { tags: "" };
    } else {
      update.$set.tags = sanitizedTags;
    }

    if (!sanitizedImageUrl) {
      update.$unset = { imageUrl: "" };
    } else {
      update.$set.imageUrl = sanitizedImageUrl;
    }

    const post = await PostModel.updateOne(
      {
        _id: postId,
      },
      update
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
      message: "Can't update post",
    });
  }
}

async function getTags(req, res) {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = [
      ...new Set(
        posts
          .map((obյ) => obյ.tags)
          .flat()
          .slice(0, 5)
      ),
    ];

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get posts",
    });
  }
}

async function getTagPost(req, res) {
  try {
    const tagName = req.params.tag;

    const posts = await PostModel.find().populate("user").exec();

    const tagPosts = posts.filter((obj) => obj.tags.includes(tagName));

    if (tagPosts.length > 0) {
      return res.json(tagPosts);
    }

    res.status(500).json({
      message: "Posts with this tag not founded",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get tag posts",
    });
  }
}

export {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
  getTags,
  getTagPost,
};

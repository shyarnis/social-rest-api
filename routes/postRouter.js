const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

// create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update a post
router.put("/:id", async (req, res) => {
    try {
        // find post by id
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            // update post
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post have been updated");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch (error) {
        res.status(500).json({ error: "User id not found" });
    }
});

// delete a post
router.delete("/:id", async (req, res) => {
    try {
        // find post by id
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            // delete post
            await post.deleteOne();
            res.status(200).json("Post have been deleted");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (error) {
        res.status(500).json({ error: "User id not found" });
    }
});

// like/dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        // find post by id
        const post = await Post.findById(req.params.id);
        // does "post" has likes by current user
        if (!post.likes.includes(req.body.userId)) {
            // like
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        } else {
            //dislike
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been disliked");
        }
    } catch (error) {}
});

// get timeline post
// like and dislike post

module.exports = router;

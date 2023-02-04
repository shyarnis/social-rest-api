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
// delete a post
// get a post
// get timeline post
// like and dislike post

module.exports = router;

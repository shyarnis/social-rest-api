const Post = require("../models/postModel");

//@desc     Get a Post
//@route    GET /api/posts/:id
//@access   Public
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

//@desc     Create a Post
//@route    POST /api/posts/
//@access   Private
const createPost = async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
};

//@desc     Update a Post
//@route    PUT /api/posts/:id
//@access   Private
const updatePost = async (req, res) => {
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
};

//@desc     Delete a Post
//@route    DELETE /api/posts/:id
//@access   Private
const deletePost = async (req, res) => {
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
};

//@desc     like/dislike a Post
//@route    PUT /api/posts/:id/like
//@access   Public
const likeDislikePost = async (req, res) => {
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
    } catch (error) {
        res.status(500).json(error);
    }
};

//@desc     Get all timeline posts
//@route    GET /api/posts/timeline/all
//@access   Public
const getTimelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost,
    likeDislikePost,
    getTimelinePost,
};

const express = require("express");
const router = express.Router();

const {
    getPost,
    createPost,
    updatePost,
    deletePost,
    likeDislikePost,
    getTimelinePost,
} = require("../controllers/postController");

router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likeDislikePost);
router.get("/timeline/all", getTimelinePost);

module.exports = router;

const express = require("express");
const router = express.Router();

// Get a user
router.get("/", (req, res) => {
    res.send("User is get");
});

module.exports = router;

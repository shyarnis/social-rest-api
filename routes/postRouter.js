const express = require("express");
const router = express.Router();

// test
router.get("/", (_, res) => {
    res.send("Hello from Post");
    console.log("OP");
});

module.exports = router;

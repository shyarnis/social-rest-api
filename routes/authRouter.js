const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// register a user
router.post("/register", async (req, res) => {
    // if not username, not email, not password
    if (!req.body.username || !req.body.email || !req.body.email) {
        res.status(400);
        throw new Error("Fill username, email, password");
    }

    // create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

// get a user
// router.get("/register", async (req, res) => {
//     const user = await new User({
//         username: "John",
//         email: "John@gmail.com",
//         password: "123456",
//     });

//     await user.save();
//     res.send("user is created");
// });

module.exports = router;

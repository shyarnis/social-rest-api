const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// register a user
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // if not username, not email, not password
    if (!username || !email || !password) {
        res.status(400).json({ error: "please add all fields" });
        // throw new Error("Please add all fields");
    }

    try {
        // hash a req.body.password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });
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

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc     Register a User
//@route    GET /api/auth/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // if not username, not email, not password
    if (!username || !email || !password) {
        res.status(400).json({ error: "please add all fields" });
        // throw new Error("Please add all fields");
    }

    // find user by username
    const userExits = await User.findOne({ username });

    if (userExits) {
        res.status(400).json({ error: "User already exits" });
    }

    try {
        // hash a req.body.password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // create a new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

//@desc     Login a User
//@route    POST /api/auth/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user in db by email
        const user = await User.findOne({ email });
        !user && res.status(404).json("user not found");

        // password validator, compare
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json("wrong password");

        // login user
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = {
    registerUser,
    loginUser,
};

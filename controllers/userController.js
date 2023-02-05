const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc     Get a User
//@route    GET /api/users/:id
//@access   Public
const getUser = async (req, res) => {
    try {
        // get all user data by given id as parameter
        const user = await User.findById(req.params.id);
        // respone only selected property
        // i.e. remove password and updatedAt property from json
        const { password, updatedAt, ...selected } = user._doc;
        res.status(200).json(selected);
    } catch (error) {
        res.status(500).json(error);
    }
};

//@desc     Update a User
//@route    PUT /api/users/:id
//@access   Private
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // check for password
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }

        // time to update a user
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("you can only update your account");
    }
};

//@desc     Delete a User
//@route    DELETE /api/users/:id
//@access   Private
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // time to delete a user
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("you can only delete your account");
    }
};

//@desc     Follow a User
//@route    PUT /api/users/:id/follow
//@access   Private
const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // user -> to be followed
            // currentUser -> oneself
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // does "user" has followers includes "currentUser"
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $push: { followings: req.params.id },
                });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You'd already followed this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
};

//@desc     Unfollow a User
//@route    PUT /api/users/:id/unfollow
//@access   Private
const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // user -> to be followed
            // currentUser -> oneself
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // does "user" has followers includes "currentUser"
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $pull: { followings: req.params.id },
                });
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You'd already unfollowed this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
};

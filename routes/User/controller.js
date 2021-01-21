const User = require("./schema");
const mongoose = require('mongoose');

const getAllUsers = (req, res) => {
    User.find({}, function (err, users) {
        if (err)
            res.send(err)
        else
            res.send(users);
    })
};
const getUserCount = (req, res) => {
    User.count({}, function (err, count) {
        if (err)
            res.send(err)
        else {
            console.log(count)
            res.send({count});

        }
    })
};
const postUser = async (req, res) => {
    let user = new User(req.body);
    let count = await User.count();
    console.log(count)
    user._id = count+1;
    try {
        user.save(function (err, user) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(user);
            }
        })
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    getAllUsers,
    postUser,
    getUserCount
}


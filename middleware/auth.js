require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/users.js");


exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ error: "Access denied. No token provided." });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedUser) {
            const user = await User.findByPk(decodedUser.userId);
            if (user) {
                req.user = user;
                next();

            } else {
                res.status(401).send({ error: "User not found." });
            }

        } else {
            res.status(401).json({ error: "Access denied. Invalid Token." });

        }

    } catch (error) {
        console.log("Authentication error - ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
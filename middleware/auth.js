require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/users.js");


exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ error: "Access denied. No token provided." });
        }

        let decodedUser;
        try {
            decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        } catch (error) {
            console.log("Token error", error);
            return res.status(401).json({ error: "Invalid token." });

        }

        const user = await User.findByPk(decodedUser.userId);
        if (user) {
            req.user = user;
            next();

        } else {
            res.status(401).send({ error: "User not found." });
        }

    } catch (error) {
        console.log("Authentication error - ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
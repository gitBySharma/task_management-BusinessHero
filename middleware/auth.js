require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/users.js");  //import user model


//function to authenticate user
exports.authenticate = async (req, res, next) => {
    try {
        //get token from request header
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ error: "Access denied. No token provided." });
        }

        //verify token
        let decodedUser;
        try {
            decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        } catch (error) {
            console.log("Token error", error);
            return res.status(401).json({ error: "Invalid token." });

        }

        //find user by id
        const user = await User.findByPk(decodedUser.userId);
        if (user) {
            req.user = user;  //set user in request object
            next();

        } else {
            res.status(401).send({ error: "User not found." });
        }

    } catch (error) {
        console.log("Authentication error - ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
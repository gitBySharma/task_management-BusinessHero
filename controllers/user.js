require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const Users = require("../models/users.js");



//controller to handle new user signup
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Users.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists.", success: false });  //error response for duplicate email
        }

        //password strength validation
        const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/;
        const digit = /\d/;
        if (password.length < 8 || !specialChars.test(password) || !digit.test(password)) {
            return res.status(400).json({ message: "Password must be alphanumeric of minimum 8 characters & contain at least one special character" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);  //encrypt the password

        const user = await Users.create({   //add the user in database
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(200).json({ message: "Signed up successfully", success: true });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong", success: false });
    }
};

//generate access token using JWT
function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name }, process.env.JWT_SECRET);
}


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ message: "User does not exist.", success: false });

        }
        const isPasswordValid = await bcrypt.compare(password, user.password);  //compare password with encrypted password
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Wrong Password", success: false });

        } else {
            const token = generateAccessToken(user.id, user.name);   //generate token for the particular user
            res.status(200).json({ message: "Logged in successfully", success: true, token: token });  //send the token in response
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};
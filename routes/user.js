const express = require("express");
const router = express.Router();

//import user controller
const userController = require("../controllers/user.js");


//route for user signup
router.post('/user/signup', userController.signup);

//route for user login
router.post('/user/login', userController.login);



module.exports = router;
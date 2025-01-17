const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.js");


router.post('/user/signup', userController.signup);

router.post('/user/login', userController.login);

module.exports = router;
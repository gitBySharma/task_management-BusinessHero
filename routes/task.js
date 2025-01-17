const express = require("express");
const router = express.Router();

const userAuthentication = require("../middleware/auth.js");
const taskController = require("../controllers/task.js");


//route for adding new tasks
router.post('/tasks/addTask', userAuthentication.authenticate, taskController.postAddTask);



module.exports = router;
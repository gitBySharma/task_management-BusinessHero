const express = require("express");
const router = express.Router();

const userAuthentication = require("../middleware/auth.js");
const taskController = require("../controllers/task.js");


//route for adding new tasks
router.post('/tasks/addTask', userAuthentication.authenticate, taskController.postAddTask);

//route to get all tasks of an user
router.get('/tasks/getAllTasks', userAuthentication.authenticate, taskController.getAllTasks);

//route to update task
router.put('/tasks/updateTask/:id', userAuthentication.authenticate, taskController.updateTask);



module.exports = router;
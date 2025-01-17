require("dotenv").config();

const { Sequelize } = require("sequelize");
const Tasks = require("../models/tasks.js");
const sequelize = require("../util/database.js");


//controller to add new task
exports.postAddTask = async (req, res, next) => {
    const t = await sequelize.transaction();  //starting a new transaction for atomicity
    try {
        const { title, description, status } = req.body;  //destructure request body

        //validate task status
        if (status !== "pending" && status !== "in-progress" && status !== "completed") {
            t.rollback();  //rollback transaction if status invalid
            return res.status(400).json({ message: "Invalid status, Status must be 'pending', 'in-progress' or 'completed'", success: false });

        }
        //save new task into database
        const newTask = await Tasks.create({
            title: title,
            description: description,
            status: status,
            userId: req.user.id  //userId received from user authentication
        }, { transaction: t });

        await t.commit();  //commit transaction if task creation is successful

        res.status(201).json({ newTask: newTask, message: "Task added successfully", success: true });

    } catch (error) {
        console.log("Task creation error", error);
        await t.rollback();  //roll back transaction in case of failure
        res.status(500).json({ Error: "Something went wrong", success: false });
    }
};
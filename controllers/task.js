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



//controller to fetch all tasks => pagination & filter applied
exports.getAllTasks = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;     //offset logic for pagination

    //search/filter parameters
    const { title, status } = req.query;

    try {
        let taskFilterCriteria = { userId: req.user.id };   //initialize filter criteria with userId

        if (title) {
            taskFilterCriteria.title = { [Sequelize.Op.like]: `%${title}%` };   //checks for like strings as the title
        }
        if (status) {
            taskFilterCriteria.status = status;
        }

        //fetch tasks with filter and pagination
        const { count, rows } = await Tasks.findAndCountAll({   //returns total number of rows and the row data
            where: taskFilterCriteria,
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],  //orders in descending order by creation date & time
        });

        if (rows.length === 0) {   //when no task is found
            return res.status(400).json({ Message: "No data found", success: false });
        }

        //respond with pagination details
        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            tasks: rows,       //list of tasks
            message: "Tasks fetched successfully",
            success: true
        });

    } catch (error) {
        console.log("Task fetching error => ", error);
        res.status(500).json({ Error: "Something went wrong", success: false });
    }
};
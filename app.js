//main application file
require("dotenv").config();

//import required modules
const express = require("express");
const cors = require("cors");
const sequelize = require("./util/database.js");

//import database models
const User = require("./models/users.js");
const Task = require("./models/tasks.js");

//import routes
const userRoutes = require("./routes/user.js");
const taskRoutes = require("./routes/task.js");

//create express app
const app = express();

//use middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//use routes
app.use(userRoutes);
app.use(taskRoutes);


//database relations
User.hasMany(Task);
Task.belongsTo(User);


//sync database and start server
sequelize.sync()
    .then((result) => {
        app.listen(process.env.PORT);
        console.log(`Server is live on port ${process.env.PORT}`);
    }).catch((err) => {
        console.log("Unable to start server ", err);
    });
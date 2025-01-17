require("dotenv").config();
const express = require("express");
const cors = require("cors");


const sequelize = require("./util/database.js");
const User = require("./models/users.js");
const Task = require("./models/tasks.js");

const userRoutes = require("./routes/user.js");
const { FORCE } = require("sequelize/lib/index-hints");


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use(userRoutes);


sequelize.sync()
    .then((result) => {
        app.listen(process.env.PORT);
        console.log(`Server is live on port ${process.env.PORT}`);
    }).catch((err) => {
        console.log("Unable to start server ", err);
    });
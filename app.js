require("dotenv").config();
const express = require("express");
const cors = require("cors");


const sequelize = require("./util/database.js");


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



sequelize.sync()
    .then((result) => {
        app.listen(process.env.PORT);
        console.log(`Server is live on port ${process.env.PORT}`);
    }).catch((err) => {
        console.log("Unable to start server ", err);
    });
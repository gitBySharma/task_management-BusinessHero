require("dotenv").config();

//import required module
const Sequelize = require("sequelize");


//create database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

//export database connection
module.exports = sequelize;
const Sequelize = require("sequelize");

//import database connection
const sequelize = require("../util/database.js");

//define task model
const Task = sequelize.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM('pending', 'in-progress', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    }
});

module.exports = Task;
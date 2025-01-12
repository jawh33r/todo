const Sequelize = require('sequelize');

// Initialize Sequelize with your database credentials
module.exports = new Sequelize('todoapp', 'postgres', '7050', {
    host: 'localhost',
    dialect: 'postgres',
});
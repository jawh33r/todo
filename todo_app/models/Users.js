const Sequelize = require('sequelize');
const db = require('../config/database');

// Define the Users model
const Users = db.define('users', {
    user_name: {
        type: Sequelize.TEXT,
        allowNull: false, // Assuming user_name cannot be null
        primaryKey: true, // Assuming user_name is the primary key in the users table
    },
    user_password: {
        type: Sequelize.TEXT,
        allowNull: false, // Assuming user_password cannot be null
    },
}, {
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
    tableName: 'users', // Explicitly specify the table name
});

module.exports = Users;
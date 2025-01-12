const Sequelize = require('sequelize');
const db = require('../config/database');

// Define the Todos model
const Todos = db.define('todos', {
    todo_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically increment the value
    },
    user_name: {
        type: Sequelize.TEXT,
        allowNull: false, // Assuming user_name cannot be null
        references: {
            model: 'users', // Reference the users table
            key: 'user_name', // Reference the user_name column in the users table
        },
    },
    todo_description: {
        type: Sequelize.TEXT,
        allowNull: false, // Assuming todo_description cannot be null
    },
    is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Default value is false
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Default value is the current timestamp
    },
}, {
    timestamps: false, // Disable Sequelize's default timestamps (createdAt, updatedAt)
    tableName: 'todos', // Explicitly specify the table name
});

module.exports = Todos;
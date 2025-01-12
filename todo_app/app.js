const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');

// Authenticate the connection to the database
db.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync the database and tables
db.sync({ force: false }) // Set force: true to drop and recreate tables (use with caution)
    .then(() => {
        console.log('Database & tables synced!');
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Models
const Users = require('./models/Users');
const Todos = require('./models/Todos');

// Define the association
Users.hasMany(Todos, {
    foreignKey: 'user_name', // Foreign key in the todos table
    onDelete: 'CASCADE', // If a user is deleted, delete all their todos
});

Todos.belongsTo(Users, {
    foreignKey: 'user_name', // Foreign key in the todos table
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Todo App API' });
});

// Todo routes
app.use('/todos', require('./routes/todo')); // Mount todo routes under /todos

// User routes
app.use('/users', require('./routes/user')); // Mount user routes under /users

// Define the port
const PORT = process.env.PORT || 5051;

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
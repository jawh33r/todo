const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.use(cors()); // Enable CORS
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
app.use('/api/todos', require('./routes/todo')); // Mount todo routes under /todos

// User routes
app.use('/api/users', require('./routes/user')); // Mount user routes under /users

//auth use
app.use('/api/auth', require('./routes/auth'));
// Define the port
const PORT = process.env.PORT || 5051;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://192.168.1.20:${PORT}`);
});
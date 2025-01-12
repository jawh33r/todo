const express = require('express');
const router = express.Router();
const Todos = require('../models/Todos');
const Users = require('../models/Users'); // Import the Users model

// GET all todos
router.get('/', async(req, res) => {
    try {
        const todos = await Todos.findAll();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new todo
router.post('/', async(req, res) => {
    try {
        const { user_name, todo_description, is_completed } = req.body;
        const newTodo = await Todos.create({
            user_name,
            todo_description,
            is_completed,
        });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET a specific todo by ID
router.get('/:id', async(req, res) => {
    try {
        const todo = await Todos.findByPk(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT (update) a todo by ID
router.put('/:id', async(req, res) => {
    try {
        const { user_name, todo_description, is_completed } = req.body;
        const todo = await Todos.findByPk(req.params.id);
        if (todo) {
            todo.user_name = user_name;
            todo.todo_description = todo_description;
            todo.is_completed = is_completed;
            await todo.save();
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a todo by ID
router.delete('/:id', async(req, res) => {
    try {
        const todo = await Todos.findByPk(req.params.id);
        if (todo) {
            await todo.destroy();
            res.json({ message: 'Todo deleted' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
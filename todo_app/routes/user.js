const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

// GET all users
router.get('/', async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new user
router.post('/', async(req, res) => {
    try {
        const { user_name, user_password } = req.body;
        const newUser = await Users.create({
            user_name,
            user_password,
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
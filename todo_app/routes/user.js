const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

// Signup route
router.post('/signup', async(req, res) => {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await Users.create({ user_name, user_password });
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
});

// Login route
router.post('/login', async(req, res) => {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await Users.findOne({ where: { user_name } });

        if (!user || user.user_password !== user_password) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

module.exports = router;
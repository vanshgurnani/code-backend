const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');


const login = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const token = authMiddleware.generateToken(user);
            
            // Log the decoded token to the console
            const decodedToken = jwt.verify(token, process.env.SECRET);
            console.log('Decoded Token:', decodedToken);
            
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).json({ username: user.username });
        console.log('Decoded Token:', req.user); // Add this line to log the decoded token
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { login, getUserData, getAllUsers };

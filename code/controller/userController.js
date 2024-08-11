const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = authMiddleware.generateToken({
            email: user.email,
            id: user._id
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};



const getUserData = async (req, res) => {
    try {
        const userEmail = req.decodedToken.email;
        const user = await User.findOne({
            email: userEmail
        });
        res.status(200).json({
            type: 'Success',
            data: user
        });
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

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const { _id, username, role } = user;
    const secretKey = process.env.SECRET;
    return jwt.sign({ userId: _id, username: username, role: role }, secretKey);
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = { userId: decodedToken.userId, username: decodedToken.username, role: decodedToken.role };
        console.log(req.user);
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const checkRole = (validRoles) => (req, res, next) => {
    try {
        const userRole = req.user.role;

        if (validRoles.includes(userRole)) {
            return next();
        }

        res.status(403).json({ error: 'Unauthorized: User is not allowed to perform this action.' });
    } catch (error) {
        console.error('Error in checkRole middleware:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { generateToken, verifyToken, checkRole };

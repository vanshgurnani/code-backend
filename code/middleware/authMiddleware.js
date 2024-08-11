const jwt = require('jsonwebtoken');
const configs = require("../configs.json");

const generateToken = ({ email, id }) => {
    const secretKey = configs.SECRET;
    const payload = { email, id};
    const options = { expiresIn: configs.JWT_ACCESS_TOKEN_EXPIRY };
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

const verifyToken = (req, res, next) => {
    const secretKey = configs.SECRET;
    const authHeader = req.headers["authorization"];
    let token = undefined;
    if (authHeader) {
        const [bearer, accessToken] = authHeader?.split(" ");
        if (bearer === "Bearer" && accessToken) {
            token = accessToken;
        }
    }

    if (!token) {
        return res.status(401).json({
            error: "Please provide accessToken.",
        });
    }
    try {
        const decodedToken = jwt.verify(token, secretKey);
        req.decodedToken = decodedToken;
        console.log("decodedToken: ", decodedToken);
        next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid accessToken provided.",
        });
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

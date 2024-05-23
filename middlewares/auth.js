const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
require('dotenv').config();

module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header('x-JWT-token');

    // Check if not token
    if (!token) {
        return res.status(401).send({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        console.log("decoded", decoded)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).send({ msg: 'Token is not valid' });
    }
};

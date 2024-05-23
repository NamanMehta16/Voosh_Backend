const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
require('dotenv').config();


exports.register = async (req, res) => {
    const { name, email, password, bio, phone, photo, isPublic } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ msg: 'User already exists' });
        }

        user = new User({ name, email, password, bio, phone, photo, isPublic });
        await user.save();

        const payload = { id: user.id };
        jwt.sign(payload, process.env.JWT_Secret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).send({ token, user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { id: user.id };
        jwt.sign(payload, process.env.JWT_Secret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



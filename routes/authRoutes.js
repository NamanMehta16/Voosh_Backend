const express = require('express');
const { check, validationResult } = require('express-validator');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');


const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            param: err.param,
            msg: err.msg
        }));
        return res.status(400).send({ errors: formattedErrors });
    }
    next();
};

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], validateRequest, register);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], validateRequest, login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const payload = { id: req.user.id };
    jwt.sign(payload, 'voosh123', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).send({ token, user: req.user })
    });
});
module.exports = router;

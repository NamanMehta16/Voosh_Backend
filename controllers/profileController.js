const User = require('../models/User');
const bcrypt = require('bcryptjs');



exports.getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }
        res.status(200).send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.editProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, bio, phone, photo, isPublic } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user profile fields
        user.name = name;
        user.email = email;
        user.bio = bio;
        user.phone = phone;
        user.photo = photo;
        user.isPublic = isPublic;

        await user.save();

        res.status(200).send({ msg: 'Profile updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.uploadPhoto = async (req, res) => {
    const userId = req.user.id;
    const { photo } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }

        // Update user's photo field
        user.photo = photo;

        await user.save();

        res.status(200).send({ msg: 'Profile photo uploaded successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.changePassword = async (req, res) => {
    const userId = req.user.id;
    const { newPassword } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Hash and update new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.status(200).send({ msg: 'Password changed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('New Password ');
    }
};

exports.changePrivacy = async (req, res) => {
    const userId = req.user.id;
    const { isPublic } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.isPublic = isPublic;
        await user.save();
        res.status(200).json({ msg: 'Profile privacy changed successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getAllProfiles = async (req, res) => {
    try {
        let profiles;
        if (req.user.role === 'admin') {
            profiles = await User.find();
        } else {
            profiles = await User.find({ isPublic: true });
        }
        res.status(200).send(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.getUserProfileById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const profile = await User.findById(userId);
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        if (!profile.isPublic && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
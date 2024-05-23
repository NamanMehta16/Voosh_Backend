const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getProfile, editProfile, uploadPhoto, changePassword, changePrivacy, getAllProfiles, getUserProfileById } = require('../controllers/profileController');

// Get user profile route
router.get('/profile', auth, getProfile);

// Edit user profile route
router.put('/profile', auth, editProfile);

// Upload profile photo route
router.put('/profile/photo', auth, uploadPhoto);

// Change password route
router.put('/profile/password', auth, changePassword);

// Change profile privacy route
router.put('/profile/privacy', auth, changePrivacy);

// Route to get all profiles
router.get('/profile/allProfiles', auth, getAllProfiles);

// Route to get a specific user profile by ID
router.get('/profile/:userId', auth, getUserProfileById);

module.exports = router;

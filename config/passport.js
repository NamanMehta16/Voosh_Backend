const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID: process.env.Passport_ClientID,
    clientSecret: process.env.Passport_clientSecret,
    callbackURL: process.env.Passport_callbackURL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                });
                await user.save();
            }
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

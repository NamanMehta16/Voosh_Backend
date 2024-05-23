const express = require('express');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes')
const passport = require('passport');
const session = require('express-session');
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require('./config/passport');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

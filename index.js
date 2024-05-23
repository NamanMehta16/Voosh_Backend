const express = require('express');
const connectDB = require('./config/dbConfig');
const app = express();

// Connect to Database
connectDB();

// // Middleware
// app.use(express.json());
// app.use(passport.initialize());

// // Passport Config
// require('./config/passport')(passport);

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

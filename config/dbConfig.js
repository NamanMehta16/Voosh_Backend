const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        await mongoose.connect('mongodb+srv://mehtanaman15:namanmehta@cluster0.ctaudkr.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
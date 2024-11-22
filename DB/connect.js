const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://newuser:1234@hyesung.yxe93.mongodb.net/?retryWrites=true&w=majority&appName=hyesung')
    } catch (error) {
        throw new Error("Connection Failed!");
    }
};
module.exports = connectDB;
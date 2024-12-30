const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
// const { getDatabaseInstance } = require("./dbConnection");

//Centralized DB connection 
const dbURI = process.env.MONGODB_URI || "mongodb+srv://gopika:policy@cluster0.tfg5cbi.mongodb.net/Appointment_Booking";

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI,{
            serverSelectionTimeoutMS: 50000,
            connectTimeoutMS: 200000,
            socketTimeoutMS: 200000,
        });
        console.log('Database connected successfully!!');
        // // Call getDatabaseInstance after successful connection
        // getDatabaseInstance();
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

//Export the connection function and the mongoose instance
module.exports = { connectDB, mongoose };
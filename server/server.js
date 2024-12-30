const express = require('express');
const cors = require('cors');
const app = express(); // Initialize the Express application
const route = require("./routes/route");
const { connectDB } = require('./db');

const PORT = 3000; // Define the port where the server will run

//Middleware
app.use(cors());
app.use(express.json());

//Connect to the database
connectDB();

//Define basic route
app.get('/api',(req,res) => {
    res.json("Hello, Connection build successfully!"); //Send a response to the root route
});

//routes
app.use("/",route)

//Start the server
app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
});
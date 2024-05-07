const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL    // local DB URL
// const mongoURL = process.env.MONGODB_URL;   // mongoDB Atlas URL

//set up mongoDB connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})

// Get the default connection 
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to mongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error',err);
})

db.on('disconnected', () => {
    console.log('Disconnected to MongoDB server');
})

// export the database connection
module.exports = db;
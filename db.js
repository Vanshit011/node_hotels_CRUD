const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

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

db.on('error', () => {
    console.log('MongoDB connection error',err);
})

db.on('disconnected', () => {
    console.log('Disconnected to MongoDB server',err);
})

// export the database connection
module.exports = db;
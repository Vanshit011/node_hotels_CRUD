const express = require('express');
const app = express();
const connection = require("./db");
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// database connection
connection();

const PersonRoutes = require('././routes/PersonRoutes');
const MenuItemRoutes = require('././routes/menuItemRoutes');

// authentication use here
app.use(passport.initialize());

const LocalAuthMiddleware = passport.authenticate('local', {session: false}) 

//API
app.get('/', function (req, res) {
    res.send("welcome to my hotel")
})


// MiddlewareFunction
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`);
    next();
}
// app.use(logRequest);


//import the router files
app.use('/person', PersonRoutes);
app.use('/menu', MenuItemRoutes);


//server 

app.listen(PORT, () => {
    console.log('server is live')
})

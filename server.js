const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//API
app.get('/', function (req, res) {
    res.send("welcome to my hotel")
})

//import the router files
const PersonRoutes = require('././routes/PersonRoutes');
const MenuItemRoutes = require('././routes/menuItemRoutes');

app.use('/person', PersonRoutes);
app.use('/menu', MenuItemRoutes);


//server 

app.listen(PORT, () => {
    console.log('server is live')
})

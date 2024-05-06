const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
app.listen(3000, () => {
    console.log('server is live')
})

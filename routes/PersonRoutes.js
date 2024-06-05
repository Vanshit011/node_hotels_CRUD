const express = require('express');
const router = express.Router();

const Person = require('../models/Person');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

//GET/POST route to add perosn data

//SIGNUP Route
router.post('/signup', async (req, res) => {
    try {
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');

        // JWT token apply
        const payload = {
            id: response.id,
            username: response.username,
        }

        // console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        // console.log("token is ", token);

        res.status(200).json({ response: response, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

// LOGIN Route
router.post('/login', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Find the user by username
        const user = await Person.findOne({ username: username });

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({ token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PROFILE route

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.userpayload;
        // console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// PERSON route

router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//parametrised API

router.get('/:workType', jwtAuthMiddleware, async (req, res) => {

    try {
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {
            const response = await Person.find({ work: workType });
            console.log('respone fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid work type' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

// PUT route to update data

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        // console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

// DELETE route to delete data

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        // console.log('data delete')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})


module.exports = router;
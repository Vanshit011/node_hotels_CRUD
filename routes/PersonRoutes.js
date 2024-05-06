const express = require('express');
const router = express.Router();

const Person = require('../models/Person');

//GET/POST route to add perosn data
router.post('/', async (req, res) => {
    try {
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

//parametrised API

router.get('/:workType', async (req, res) => {

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
        res.status(200).json({message: 'person deleted succefully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})


module.exports = router;
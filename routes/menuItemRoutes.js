const express = require('express');
const router = express.Router()

const MenuItem = require('../models/Menu');
// const { route } = require('./PersonRoutes');
// const { route } = require('./PersonRoutes');

// GET/POST route to add menu data
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).json(data);
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'internal server error' });
    }

})

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log('menuItem saved');
        res.status(200).json(response);
    } catch (error) {
        console.log("error");
        res.status(500).json({ error: 'internal server error' })
    }
})

//parametrised API

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType === 'sweet' || tasteType === 'sour' || tasteType === 'spicy') {
            const response = await MenuItem.find({ taste: tasteType });
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid taste type' })
        }
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'internal server error' });
    }
})

//PUT route to update data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updateMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(personId, updateMenuItemData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: 'MenuItem not found' })
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
})

//DELETE route to delete data

router.delete('/:id', async (req,res) => {
    try {
        const MenuItemId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(MenuItemId);
        if (!response) {
            return res.status(404).json({error: 'person not found'})
        }

        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal sever error'})
    }
})

module.exports = router;
const express = require('express');
const Character = require('./characterModel'); 
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from backend')
    console.log('Home route called')
})

router.get('/characters', async (req,res) => {
    try {
        const characters = await Character.find(); //fetch all characters from DB
        res.json(characters); //response with characters in json format
    } catch (err) {
        console.log(err);
        res.status(500).json({err: 'Failed to fetch characters'})
    }
})

router.get('/characters/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json(character); // Return character data with xp and tasks
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/characters/:id', async (req, res) => {
    const { id } = req.params; // Get the character ID from the URL
    const { xp, tasks } = req.body; // Get the updated XP and tasks from the request body

    try {
        // Find the character by ID and update XP and tasks
        const updatedCharacter = await Character.findByIdAndUpdate(
            id,
            { xp, tasks },
            { new: true, runValidators: true } // Return the updated character document
        );

        if (!updatedCharacter) {
            return res.status(404).json({ error: 'Character not found' });
        }

        res.json(updatedCharacter); // Send the updated character back as the response
    } catch (error) {
        console.error('Error updating character:', error);
        res.status(500).json({ error: 'Failed to update character' });
    }
});

module.exports = router;
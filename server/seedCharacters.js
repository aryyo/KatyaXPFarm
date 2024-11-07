require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('./characterModel'); // Adjust the path based on your structure
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

const characters = [
  { name: 'Katya', xp: 0, tasks: [] }, // You can add initial tasks if you want
  { name: 'Uuman', xp: 0, tasks: [] },
];

const seedCharacters = async () => {
  try {
    await mongoose.connect(URL);

    // Delete existing characters if needed
    await Character.deleteMany({});

    // Add characters
    await Character.insertMany(characters);
    console.log('Characters seeded successfully!');
  } catch (error) {
    console.error('Error seeding characters:', error);
  } finally {
    await mongoose.disconnect(); // Close the database connection
  }
};

seedCharacters();

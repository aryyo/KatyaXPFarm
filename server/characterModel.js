//Setup for schema
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
})

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    xp: { type: Number, default: 0 },
    tasks: [taskSchema], // Array of task objects
  });
  
module.exports = mongoose.model('Character', characterSchema);
const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});

module.exports = mongoose.model("exercise", ExerciseSchema);

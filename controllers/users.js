const User = require("../models/User");
const Exercise = require("../models/Exercise");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  console.log(req.body);

  const userObj = new User({
    username: req.body.username,
  });

  try {
    const user = await userObj.save();
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const createExercise = async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.send("Could not find user");
    } else {
      const exerciceObj = new Exercise({
        user_id: user._id,
        description,
        duration,
        date: date ? new Date(date) : new Date(),
      });

      const exercise = await exerciceObj.save();
      res.json({
        _id: user._id,
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString,
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Error saving exercise: " + error.message);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  createExercise,
};

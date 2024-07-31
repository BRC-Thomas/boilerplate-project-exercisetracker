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
        username: user.username,
        _id: user._id,
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Error saving exercise: " + error.message);
  }
};

const getUserLogs = async (req, res) => {
  const { from, to, limit } = req.query;
  const userID = req.params._id;
  const user = await User.findById(userID);

  if (!user) {
    res.send("Could not find user");
    return;
  }

  let filter = {
    user_id: userID,
  };
  let dateObj = {};

  if (from) {
    dateObj["$gte"] = new Date(from);
  }
  if (to) {
    dateObj["$lte"] = new Date(to);
  }
  if (from || to) {
    filter.date = dateObj;
  }

  try {
    const exercises = await Exercise.find(
      filter
    ).limit(+limit ?? 500);

    const log = exercises.map(e => ({
      description : e.description,
      duration : e.duration,
      date : e.date.toDateString(),
    }))

    const logsCount = await Exercise.countDocuments({ user_id: userID });

    res.json({
      username: user.username,
      count: logsCount,
      _id: user._id,
      log: log,
    });
  } catch (error) {}
};

module.exports = {
  getAllUsers,
  createUser,
  createExercise,
  getUserLogs,
};

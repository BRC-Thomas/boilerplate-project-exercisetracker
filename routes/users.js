const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  createExercise,
  getUserLogs,
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:_id/exercises").post(createExercise);
router.route("/:_id/logs").get(getUserLogs);

module.exports = router;

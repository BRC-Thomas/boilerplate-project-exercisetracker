const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  createExercise,
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:_id/exercises").post(createExercise);

module.exports = router;

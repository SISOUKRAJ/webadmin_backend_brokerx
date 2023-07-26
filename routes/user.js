const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
  getUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);

router.route("/").get(getUser).post(createUser);
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;

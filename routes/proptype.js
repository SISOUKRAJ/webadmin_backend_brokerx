const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
} = require("../controllers/proptype");
// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken)
router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).put(update).delete(deleteOne);

module.exports = router;

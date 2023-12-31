const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
} = require("../controllers/proptype");

router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).put(update).delete(deleteOne);

module.exports = router;

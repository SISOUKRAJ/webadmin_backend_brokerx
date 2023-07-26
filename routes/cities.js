const express = require("express");
const router = express.Router();
const {
  getCities,
  getOneCities,
  createCities,
  updateCities,
  deleteCities,
} = require("../controllers/cities");
// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken)
router.route("/").get(getCities).post(createCities);
router.route("/:id").get(getOneCities).put(updateCities).delete(deleteCities);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getCities,
  getOneCities,
  createCities,
  updateCities,
  deleteCities,
} = require("../controllers/cities");

router.route("/").get(getCities).post(createCities);
router.route("/:id").get(getOneCities).put(updateCities).delete(deleteCities);

module.exports = router;

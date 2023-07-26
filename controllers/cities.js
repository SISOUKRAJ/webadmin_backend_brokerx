const asyncHandler = require("express-async-handler");
const CitySchema = require("../models/city");

//@desc Get All cities
//@router Get /api/cities
//@access private
const getCities = asyncHandler(async (req, res) => {
  const cities = await CitySchema.find();
  res.status(200).json(cities);
});
//@desc  Get One All cities
//@router  Get One /api/cities
//@access private
const getOneCities = asyncHandler(async (req, res) => {
  const cities = await CitySchema.findById(req.params.id);
  if (!cities) {
    res.status(404);
    throw new Error("City not Found");
  }
  res.status(200).json(cities);
});
//@desc Create All cities
//@router Create /api/cities
//@access private
const createCities = asyncHandler(async (req, res) => {
  //   console.log("Body", req.body);
  const { city_name } = req.body;
  if (!city_name) {
    res.status(400);
    throw new Error("All Field are mandatory!");
  }

  const cities = await CitySchema.create({
    city_name,
  });

  res.status(201).json(cities);
});
//@desc Update All cities
//@router Update /api/cities
//@access private
const updateCities = asyncHandler(async (req, res) => {
  const cities = await CitySchema.findById(req.params.id);
  if (!cities) {
    res.status(404);
    throw new Error("City not Found");
  }
  const updateCity = await CitySchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateCity);
});
//@desc Delete All cities
//@router Delete /api/cities
//@access private
const deleteCities = asyncHandler(async (req, res) => {
  const cities = await CitySchema.findById(req.params.id);
  if (!cities) {
    res.status(404);
    throw new Error("City not Found");
  }

  const deleteCity = await CitySchema.findByIdAndRemove(req.params.id, {
    new: true,
  });

  res.status(200).json(deleteCity);
});

module.exports = {
  getCities,
  getOneCities,
  createCities,
  updateCities,
  deleteCities,
};

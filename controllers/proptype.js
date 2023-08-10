const asyncHandler = require("express-async-handler");
const PropTypeSchema = require("../models/proptype");

//@desc Get All cities
//@router Get /api/cities
//@access private
const getAll = asyncHandler(async (req, res) => {
  const cities = await PropTypeSchema.find();
  res.status(200).json(cities);
});
//@desc  Get One All cities
//@router  Get One /api/cities
//@access private
const getOne = asyncHandler(async (req, res) => {
  const cities = await PropTypeSchema.findById(req.params.id);
  if (!cities) {
    res.status(404);
    throw new Error("City not Found");
  }
  res.status(200).json(cities);
});
//@desc Create All cities
//@router Create /api/cities
//@access private
const create = asyncHandler(async (req, res) => {
  //   console.log("Body", req.body);
  const { type_name } = req.body;
  if (!type_name) {
    res.status(400);
    throw new Error("All Field are mandatory!");
  }

  const data = await PropTypeSchema.create({
    type_name,
  });

  res.status(200).json(data);
});
//@desc Update All cities
//@router Update /api/cities
//@access private
const update = asyncHandler(async (req, res) => {
  const cities = await PropTypeSchema.findById(req.params.id);
  if (!cities) {
    res.status(404);
    throw new Error("City not Found");
  }
  const updateCity = await PropTypeSchema.findByIdAndUpdate(
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
const deleteOne = asyncHandler(async (req, res) => {
  const cities = await PropTypeSchema.findById(req.params.id);
  if (!cities) {
    res.status(404);
    throw new Error("City not Found");
  }

  const deleteCity = await PropTypeSchema.findByIdAndRemove(req.params.id, {
    new: true,
  });

  res.status(200).json(deleteCity);
});

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};

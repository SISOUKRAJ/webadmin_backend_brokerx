const asyncHandler = require("express-async-handler");
const PropertySchema = require("../models/property");
const path = require("path");

//@desc Get All property
//@router Get /api/property
//@access private
const getAll = asyncHandler(async (req, res) => {
  const property = await PropertySchema.find().populate("city property_type");
  res.status(200).json(property);
});

//@desc  Get One All property
//@router  Get One /api/property
//@access private
const getOne = asyncHandler(async (req, res) => {
  const property = await PropertySchema.find().populate("city property_type");
  if (!property) {
    res.status(404);
    throw new Error("property not Found");
  }
  res.status(200).json(property);
});

//@desc Create All property
//@router Create /api/property
//@access private
const create = asyncHandler(async (req, res) => {
  //   console.log("Body", req.body);
  const body = req.body;
  // console.log("body", body);
  const files = req.files;
  // console.log("files", files);
  // if (!type_name) {
  //   res.status(400);
  //   throw new Error("All Field are mandatory!");
  // }

  const { gallery } = req.files;
  const fileName = [];

  Object.keys(gallery).forEach((key) => {
    const filepath = path.join(
      __dirname,
      "../assets/images/property",
      gallery[key].name
    );
    console.log("filepath", filepath);
    fileName.push(gallery[key].name);
    gallery[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });
  // console.log("fileName", fileName);
  const galleryName = fileName.map((index) => {
    return {
      name: index,
    };
  });
  // console.log("galleryName", galleryName);
  const data = await PropertySchema.create({
    ...body,
    gallery: galleryName,
  });
  res.status(200).json(data);
  // res.status(200).json({ message: "sucess" });
});

//@desc Update All property
//@router Update /api/property
//@access private
const update = asyncHandler(async (req, res) => {
  // console.log("req.params.id", req.params.id);
  const property = await PropertySchema.findById(req.params.id);
  // console.log("property", property);

  if (!property) {
    res.status(404);
    throw new Error("property not Found");
  }

  const body = req.body;
  console.log("body", body);
  const files = req.files;
  console.log("files", files);
  const updateproperty = await PropertySchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateproperty);
  // res.status(200).json({ message: "sucess" });
});
//@desc Delete All property
//@router Delete /api/property
//@access private
const deleteOne = asyncHandler(async (req, res) => {
  const property = await PropertySchema.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error("property not Found");
  }

  const deleteproperty = await PropertySchema.findByIdAndRemove(req.params.id, {
    new: true,
  });

  res.status(200).json(deleteproperty);
});

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};

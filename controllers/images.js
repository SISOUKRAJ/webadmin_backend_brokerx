const asyncHandler = require("express-async-handler");
const path = require("path");

//@desc  Get One cities
//@router  Get One /api/cities
//@access private
const getOneImages = asyncHandler(async (req, res) => {
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
const createImages = asyncHandler(async (req, res) => {
  let imagesFile;
  let fileName = [];

  // const file = req.body;
  // console.log("file", file);
  const files = req.files;
  // console.log("files", files);

  imagesFile = files.images;
  // console.log("imagesFile", imagesFile);

  Object.keys(imagesFile).forEach((key) => {
    const filepath = path.join(
      __dirname,
      "../assets/images/property",
      imagesFile[key].name
    );
    // console.log("filepath", filepath);
    imagesFile[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });

  const properVerb = imagesFile.length > 1 ? "are" : "is";
  const proper = imagesFile.length > 1 ? "these" : "this";

  // const sentence =
  //   `Upload ${imagesFile.toString()} ${properVerb} success.`.replaceAll(
  //     ",",
  //     ", "
  //   );

  Object.keys(imagesFile).forEach((key) => {
    fileName.push(imagesFile[key].name);
  });

  const sentence = `Upload ${proper} ${fileName.toString()} ${properVerb} success.`.replaceAll(",", ", ");

  res.status(200).json({ status: "Success", message: sentence });
});

module.exports = {
  getOneImages,
  createImages,
};

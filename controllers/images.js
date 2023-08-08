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
  let fileName;

  // const file = req.body;
  // console.log("file", file);
  const files = req.files;
  // console.log("files", files);

  imagesFile = files.images;
  console.log("imagesFile", imagesFile);

  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, "files", files[key].name);
    console.log("filepath", filepath);
    fileName.push(filepath)
    // files[key].mv(filepath, (err) => {
    //   if (err) return res.status(500).json({ status: "error", message: err });
    // });
  });

  const properVerb = imagesFile.length > 1 ? "are" : "is";
  const sentence =
    `Upload ${imagesFile.toString()} ${properVerb} success.`.replaceAll(
      ",",
      ", "
    );

  res.status(200).json({ message: sentence });
});

module.exports = {
  getOneImages,
  createImages,
};

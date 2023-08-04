const asyncHandler = require("express-async-handler");

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
  let sampleFile;
  let uploadPath;

  const file = req.body;
  // console.log("file", file);
  const files = req.files;
  // console.log("files", files);

  sampleFile = files.images;
  console.log("sampleFile", sampleFile);

  const images = await sampleFile.map((index) => {
    const uploadPath = "../upload/" + index.name;

    // const result = index.mv(uploadPath, function (err) {
    //   if (err) return res.status(500).send(err);

    //   res.send("File uploaded!");
    // });
    return uploadPath;
  });
  console.log("images", images);
});

module.exports = {
  getOneImages,
  createImages,
};

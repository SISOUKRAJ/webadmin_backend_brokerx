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
  //   res.status(200).json({ massage: upload });

  // if (!upload || Object.keys(upload).length === 0) {
  //   return res.status(400).send("No files were uploaded.");
  // }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = await file;
  // const nameItem = await sampleFile.map((index) => {
  //   uploadPath = __dirname + "/assets/images/property/" + index.name;
  //   return uploadPath;
  // });
  // console.log("nameItem", nameItem);

  uploadPath = __dirname + "/../assets/images/property" + sampleFile.name;
  console.log("uploadPath", uploadPath);
    // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    // res.send("File uploaded!");
    res.status(200).json({ massage: "File uploaded!" });
  });
  // res.json({ massage: "xxx" });
});

module.exports = {
  getOneImages,
  createImages,
};

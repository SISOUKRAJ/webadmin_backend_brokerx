const express = require("express");
const router = express.Router();
// const multer = require("multer");

const {
  //   getimages,
  createImages,
  getOneImages,
  //   updateimages,
  //   deleteimages,
} = require("../controllers/images");
// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken)
// const uploads = multer({ dest: __dirname + "/../assets/images/property/" });

// router.route("/", uploads.array("file")).post(createImages);
// router.route("/:id").get(getOneImages);

module.exports = router;

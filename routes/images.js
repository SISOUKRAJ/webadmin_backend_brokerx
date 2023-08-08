const express = require("express");
const router = express.Router();
// const multer = require("multer");
const fileExtlimiter = require("../middleware/image/fileExtLimiter");
const fileSizeLimiter = require("../middleware/image/fileSizeLiniter");
const filesPayLoadExists = require("../middleware/image/filesPayLoadExists");

const {
  //   getimages,
  createImages,
  getOneImages,
  //   updateimages,
  //   deleteimages,
} = require("../controllers/images");
// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken)

router.route("/").post(
  fileExtlimiter([".png", ".jpg", ".jepg"]),
  fileSizeLimiter,
  // filesPayLoadExists,
  createImages
);
// router.route("/:id").get(getOneImages);

module.exports = router;

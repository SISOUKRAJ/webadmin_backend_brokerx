const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files.images;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    console.log("fileExtensions", fileExtensions);

    //Are the file extension allowed?
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );
    console.log("allowed", allowed);

    if (!allowed) {
      const message =
        `Upload Failed. ${allowedExtArray.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );
      return res.json({ status: "error", message });
    }

    next();
  };
};

module.exports = fileExtLimiter;

const MB = 5;
const FILE_SIZE_LIMITER = MB * 1024 * 1024;

const fileSizrLiniter = (req, res, next) => {
  const files = req.files.images;

  //   console.log("files", files);

  const filesOverLimit = [];

  //Which Files are over limit?
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMITER) {
      filesOverLimit.push(files[key].name);
    }
  });

  //   console.log("filesOverLimit", filesOverLimit);

  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? "are" : "is";
    const sentence =
      `Upload Failed. ${filesOverLimit.toString()} ${properVerb} over the file size of ${MB} MB.`.replaceAll(
        ",",
        ", "
      );
    const message =
      filesOverLimit.length < 3
        ? sentence.replace(",", " and")
        : sentence.replace(/, (?=[^,]*$)/, " and");

    // console.log("message", message);

    return res.json({ status: "error", message });
  }

  next();
};

module.exports = fileSizrLiniter;

const filesPayLoadExists = (req, res, next) => {
  if (!req.files.images)
    return res.json({ status: "error", message: "Messing Files" });
};
module.exports = filesPayLoadExists;

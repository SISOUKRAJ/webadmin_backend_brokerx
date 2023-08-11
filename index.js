const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");

const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/brokerx", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Mongodb Connected`);
});

const hostname = process.env.IP_DEV;
const port = process.env.PORT;

// default options
app.use(fileUpload({ createParentPath: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

// images path
const images_prop_path = path.join(__dirname, "./assets/images/property");
// console.log("filepath", images_prop_path);
// static images
app.use("/images/property", express.static(images_prop_path));
// Images Upload
app.use("/api/image_property", require("./routes/images"));
// Routes
app.use("/api/city", require("./routes/cities"));
app.use("/api/user", require("./routes/user"));
app.use("/api/property_type", require("./routes/proptype"));
app.use("/api/property", require("./routes/properties"));


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

// static images
app.use('/img', express.static(__dirname + "./assets/images/property"))
// Routes
app.use("/api/city", require("./routes/cities"));
app.use("/api/user", require("./routes/user"));
app.use("/api/property_type", require("./routes/proptype"));

// static images
app.use("/api/image_property", require("./routes/images"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

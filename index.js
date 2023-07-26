const errorHandler = require("./middleware/errorHandler");

const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv").config();

mongoose.connect("mongodb://0.0.0.0:27017/brokerx", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Mongodb Connected`);
});

const hostname = "127.0.0.1";
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use("/api/city", require("./routes/cities"));
app.use("/api/user", require("./routes/user"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

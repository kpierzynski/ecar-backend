const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use("/api", routes);

mongoose.connect("mongodb://localhost:27017/backend_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(-1);
});

db.once("open", () => {
  console.log("Connected to database");

  app.listen(port, () => {
    console.log(`Server Started at ${port}`);
  });
});

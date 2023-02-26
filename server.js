const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/backend_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(-1);
});

db.once("open", () => {
  const port = process.env.PORT || 8080;
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`Server Started at ${port}`);
  });
});

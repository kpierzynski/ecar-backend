const express = require("express");
const homeRouter = require("./routes/home");

const router = express.Router();

router.use("/", homeRouter);

module.exports = router;

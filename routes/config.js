const Axios = require("axios");
var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  console.log("slack command");
});

module.exports = router;

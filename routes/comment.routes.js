//const Comment = require("../models/Comment.model");
const express = require("express");
const router = express.Router();
//Just for testing purpose
router.get("/", (req, res) => {
  res.json("All good in here in auth");
});

module.exports = router;

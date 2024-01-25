const express = require("express");
const router = express.Router();

// const Comment = require("../models/Comment.model.js")

router.get('/', (req, res) => {
    res.json('Comments routes')
    console.log("ok")
})



module.exports = router;



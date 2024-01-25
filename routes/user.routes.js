const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("All good in here in user");
});

module.exports = router;

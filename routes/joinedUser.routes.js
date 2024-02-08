const Joined = require("../models/JoinedUser.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/route-guard.middleware");

// For testing purpose
router.get("/", async (req, res) => {
  try {
    const allJoinedUser = await Joined.find();
    res.status(200).json(allJoinedUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while fetching Joined User information" });
  }
});

module.exports = router;

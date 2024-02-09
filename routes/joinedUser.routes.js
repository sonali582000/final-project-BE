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

//Post request
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.tokenPayload;
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({ message: "Something is missing " });
    }

    const newUserJoined = await Joined.create({
      joinedUser: userId,
      joinedEvent: payload.eventId,
    });
    res.status(201).json(newUserJoined);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while adding new User in the event" });
  }
});

module.exports = router;

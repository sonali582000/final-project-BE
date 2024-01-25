const { isAuthenticated } = require("../middleware/route-guard.middleware");
const Event = require("../models/Event.model");
const User = require("../models/User.model");

const router = require("express").Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const allEvents = await Event.find();
    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the Events" });
  }
});
// GET one
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const oneEvent = await Event.findById(eventId);
    res.status(200).json(oneEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the Event" });
  }
});

// POST one
router.post("/", isAuthenticated, async (req, res) => {
  const payload = req.body;
  const { userId } = req.tokenPayload;
  payload.createdBy = userId;
  try {
    const createdEvent = await Event.create(payload);
    res.status(201).json(createdEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the Event" });
  }
});
// PUT one
router.put("/:eventId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const payload = req.body;
  const { eventId } = req.params;
  try {
    const eventToUpdate = await Event.findById(eventId);
    if (eventToUpdate.createdBy == userId) {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, payload, {
        new: true,
      });
      res.status(200).json(updatedEvent);
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the Event" });
  }
});
// DELETE one
router.delete("/:eventId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const { eventId } = req.params;
  try {
    const eventToDelete = await Event.findById(eventId);
    console.log(eventToDelete, userId);
    if (eventToDelete.createdBy == userId) {
      console.log("Deleting");
      await Event.findByIdAndDelete(eventId);
      res.status(204).json();
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    res.status(500).json({ message: "error while deleting the Event" });
  }
});

module.exports = router;

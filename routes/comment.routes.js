const Comment = require("../models/Comment.model.js");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/route-guard.middleware");

//for testing purpose
router.get("/", async (req, res) => {
  try {
    const allcomments = await Comment.find();
    res.status(200).json(allcomments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while fetching the comments" });
  }
});

// to get all the comments on the event by the user
router.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const userComment = await Comment.findById(commentId);
    res.status(200).json(userComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the comments" });
  }
});

// to get all the comments on events
router.get("/event/:eventId", async (req, res) => {
  try {
    // {eventTitle:ObjectId('65b2799a4151c5da6cbf8262')}
    const { eventId } = req.params;
    const eventComments = await Comment.find({ eventTitle: eventId });
    res.status(200).json(eventComments);
    console.log(eventComments);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error while getting the comments of an event" });
  }
});

// creating new comment by user on specific event
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.tokenPayload;
    const payload = req.body;

    if (!payload.text) {
      return res.status(400).json({ message: "the text is required" });
    }

    const newComment = await Comment.create({
      text: payload.text,
      madeBy: userId,
      eventTitle: payload.eventId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the Comment" });
  }
});

// update the specific comment

router.put("/:commentId", isAuthenticated, async (req, res) => {
  try {
    const payload = req.body;
    const { userId } = req.tokenPayload;
    const { commentId } = req.params;

    const commentToUpdate = await Comment.findOne({
      _id: commentId,
    });
    if (commentToUpdate && commentToUpdate.madeBy == userId) {
      const commentUpdate = await Comment.findByIdAndUpdate(
        commentId,
        payload,
        { new: true }
      );
      res.status(200).json(commentUpdate);
    } else {
      res
        .status(403)
        .json({ message: "you are not the right user to update comment" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the comments" });
  }
});

// delete one comment

router.delete("/:commentId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const { commentId } = req.params;
  try {
    const commentToDelete = await Comment.findById({ _id: commentId });
    console.log(commentToDelete);
    if (commentToDelete.madeBy == userId) {
      console.log("Deleting");
      await Comment.findByIdAndDelete(commentId);
      res.status(204).json();
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    res.status(500).json({ message: "error while deleting the Comment" });
  }
});

module.exports = router;

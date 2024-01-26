const { Schema, Types, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: String,
    madeBy: { type: Types.ObjectId, ref: "User" },
    eventTitle: { type: Types.ObjectId, ref: "Event" },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;

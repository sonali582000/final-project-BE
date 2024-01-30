const { Schema, model, Types } = require("mongoose");

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["in-person", "virtual", "hybrid"],
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "canceled"],
    },
    photo: {
      type: String,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);
module.exports = Event;

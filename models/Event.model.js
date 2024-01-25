const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    titel: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      // The dates of the first and last episodes of
      // Star Trek: The Next Generation
      min: "2024-01-01",
      max: "2030-12-27",
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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Event;

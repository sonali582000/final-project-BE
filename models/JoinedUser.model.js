const { Schema, Types, model } = require("mongoose");

const joinedSchema = new Schema(
  {
    joinedUser: { type: Types.ObjectId, ref: "User" },
    joinedEvent: { type: Types.ObjectId, ref: "Event", required: true },
  },
  {
    timestamps: true,
  }
);

const Joined = model("Joined", joinedSchema);
module.exports = Joined;

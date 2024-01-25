const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  user_id: {
    type: String,
  },
  first_name: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  location: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
});

const newUser = model("newUser", userSchema);

module.exports = newUser;

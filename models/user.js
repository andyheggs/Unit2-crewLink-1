const mongoose = require("mongoose");

// Define the application schema
const applicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted'],
  },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema], // Embed applications within the user schema
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;


const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: String,
  role: { type: String, enum: ["buyer", "farmer"] },

  message: String,
  link: String,

  read: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);

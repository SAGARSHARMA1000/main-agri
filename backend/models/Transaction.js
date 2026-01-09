const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: String, // buyer or farmer
  escrowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Escrow"
  },

  type: {
    type: String,
    enum: ["credit", "debit"]
  },

  amount: Number,

  description: String,

  status: {
    type: String,
    enum: ["Success", "Locked"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);

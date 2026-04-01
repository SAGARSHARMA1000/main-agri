
const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  proposalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: true,
    unique: true // 🚫 prevent duplicate contracts
  },

  // buyerId: {String, required:true},
  buyerId: String,
  buyerName: String,

  //farmerId:{ String, required:true},
  farmerId: String,
  farmerName: String,

  commodity: String,
  price:Number,
  quantity: String,
  unit: String,
  offerPrice: Number,

  pickupDate: String,
  deliveryAddress: String,
  farmAddress:String,

  status: {
    type: String,
    enum: [
      "draft",
      "sent_to_farmer",
      "farmer_signed",
      "active",
      "rejected",
      "closed"
    ],
    default: "draft"
  },

  signatures: {
    buyerName: String,
    buyerSignatureUrl: String,
    farmerName: String,
    farmerSignatureUrl: String
  },

pdf: {
  url: String,
  generatedAt: Date
},

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contract", contractSchema);


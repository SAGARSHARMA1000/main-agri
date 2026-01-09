// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   contract: { type: mongoose.Types.ObjectId, ref: 'Contract' },
//   user: { type: mongoose.Types.ObjectId, ref: 'User' },
//   gateway: String,
//   amount: Number,
//   currency: { type: String, default: 'INR' },
//   status: { type: String, enum: ['pending','succeeded','failed','refunded'], default: 'pending' },
//   gatewayResponse: mongoose.Schema.Types.Mixed,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Payment', paymentSchema);
// const mongoose = require("mongoose");

// const escrowSchema = new mongoose.Schema({
//   contractId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Contract",
//     required: true
//   },

//   buyerId: String,
//   farmerId: String,

//   amount: Number,

//   status: {
//     type: String,
//     enum: ["pending", "deposited", "released", "refunded"],
//     default: "pending"
//   },

//   depositedAt: Date,
//   releasedAt: Date
// });

// module.exports = mongoose.model("Escrow", escrowSchema);
const mongoose = require("mongoose");

const escrowSchema = new mongoose.Schema({
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
    required: true
  },

  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },

  amount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending","locked", "released"],
    default: "Pending"
  },

  releaseCondition: {
    type: String,
    default: "Delivery Confirmation"
  },

  depositedAt: {
    type: Date,
    //default: Date.now
  },
  deliveryConfirmed: {
  type: Boolean,
  default: false
},

deliveryConfirmedAt: Date,
// 🔥 AUTO RELEASE
  autoReleased: {
    type: Boolean,
    default: false
  },


  releasedAt: Date
});

module.exports = mongoose.model("Escrow", escrowSchema);

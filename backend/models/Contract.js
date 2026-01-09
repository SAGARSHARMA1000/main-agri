// const mongoose = require('mongoose');

// const contractSchema = new mongoose.Schema({
//   proposal: { type: mongoose.Types.ObjectId, ref: 'Proposal', required: true },
//   listingSnapshot: { type: Object }, // copy of listing at time of contract
//   farmer: { type: mongoose.Types.ObjectId, ref: 'User' },
//   buyer: { type: mongoose.Types.ObjectId, ref: 'User' },
//   pricePerQtl: Number,
//   quantity: String,
//   totalAmount: Number,
//   state: { type: String, enum: ['draft','active','escrow_funded','delivered','verified','completed','disputed','cancelled'], default: 'draft' },
//   signatures: {
//     farmer: { signed: Boolean, at: Date },
//     buyer: { signed: Boolean, at: Date }
//   },
//   contractPdf: { url: String, filename: String },
//   escrow: {
//     amount: Number,
//     currency: { type: String, default: 'INR' },
//     paymentRef: String,
//     fundedAt: Date,
//     releasedAt: Date
//   },
//   audit: [{ actor: mongoose.Types.ObjectId, action: String, ts: Date }],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Contract', contractSchema);
// import mongoose from "mongoose";

// const contractSchema = new mongoose.Schema({
//   proposalId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Proposal",
//     required: true
//   },

//   buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

//   contractData: Object, // editable JSON
//   contractPdfUrl: String, // stored PDF/image path

//   status: {
//     type: String,
//     enum: [
//       "DRAFT",
//       "SENT_TO_FARMER",
//       "FARMER_SIGNED",
//       "ACTIVE",
//       "REJECTED"
//     ],
//     default: "DRAFT"
//   },

//   buyerSignature: {
//     name: String,
//     imageUrl: String,
//     signedAt: Date
//   },

//   farmerSignature: {
//     name: String,
//     imageUrl: String,
//     signedAt: Date
//   }

// }, { timestamps: true });

// export default mongoose.model("Contract", contractSchema);
// models/Contract.js
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


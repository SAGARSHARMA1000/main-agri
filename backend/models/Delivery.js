const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  status: String,
  at: { type: Date, default: Date.now }
});

const deliverySchema = new mongoose.Schema(
  {
    deliveryId: { type: String, unique: true },

    contractId: String,

    // farmerId: mongoose.Schema.Types.ObjectId,
    // buyerId: mongoose.Schema.Types.ObjectId,
    farmerId:String,
    buyerId:String,

    crop: String,
    quantity: String,
    price: String,
    totalValue: Number,

    escrowAmount: Number,

    pickupAddress: String,
    deliveryAddress: String,

    driverId: mongoose.Schema.Types.ObjectId,

    deliveryStatus: {
      type: String,
      enum: Object.values({
        PICKUP_SCHEDULED: "PICKUP_SCHEDULED",
        COLLECTED_FROM_FARMER: "COLLECTED_FROM_FARMER",
        IN_TRANSIT: "IN_TRANSIT",
        DELIVERED_TO_BUYER: "DELIVERED_TO_BUYER",
        CONFIRMED_BY_BUYER: "CONFIRMED_BY_BUYER",
        AUTO_CONFIRMED: "AUTO_CONFIRMED",
        ESCROW_RELEASED: "ESCROW_RELEASED",
        ISSUE_REPORTED: "ISSUE_REPORTED"
      }),
      default: "PICKUP_SCHEDULED"
    },

    deliveredAt: Date,

    timeline: [timelineSchema],

    issue: {
      description: String,
      createdAt: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);

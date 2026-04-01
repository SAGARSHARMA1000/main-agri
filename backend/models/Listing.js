const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    commodity: {
      type: String,
      required: true,
      trim: true
    },

    variety: {
      type: String,
      trim: true
    },

    quantity: {
      type: String,
      required: true 
    },

    price: {
      type: Number,
      required: true
    },

    quality: {
      type: String,
      default: "Standard"
    },

    farmAddress: {
      type: String,
      required: true
    },

    // ✅ IMPORTANT: real farmer identity
    // sellerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },

    // ✅ For UI display only
     farmerId: { type: String, required:true },
     farmerName: {type: String, required:true},

    // 🔮 Optional future fields
    negotiationAllowed: {
      type: Boolean,
      default: false
    },
    minPrice: { type: Number },
    maxPrice: { type: Number },

    image: {
      type: String 
    },

    status: {
      type: String,
      enum: ["active", "booked", "closed"],
      default: "active"
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Listing", listingSchema);

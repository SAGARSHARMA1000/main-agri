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
      required: true // e.g. "50 Quintal"
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
     farmerName: {type: String},

    // 🔮 Optional future fields
    negotiationAllowed: {
      type: Boolean,
      default: true
    },

    image: {
      type: String // store image URL later (Cloudinary)
    },

    status: {
      type: String,
      enum: ["active", "booked", "closed"],
      default: "active"
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("Listing", listingSchema);

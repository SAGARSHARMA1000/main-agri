const Listing = require('../models/Listing');
const User = require('../models/User');

// exports.createListing = async (req, res) => {
//   try {
//     const listing = await Listing.create({
//       commodity: req.body.commodity,
//       quantity: req.body.quantity,
//       price: req.body.price,
//       location: req.body.location,
//       farmerName: req.body.sellerName,
//       farmerId:req.body.farmerId,
//     });

//     res.status(201).json({ listing });
//   } catch (err) {
//     res.status(500).json({ message: "Listing creation failed" });
//   }
// };

exports.createListing = async (req, res) => {
  try {
    const {
      commodity,
      quantity,
      price,
      farmAddress,
      farmerId,
      farmerName,
      negotiationAllowed
    } = req.body;

    // ✅ basic validation
    if (!farmerId || !farmerName) {
      return res.status(400).json({
        message: "farmerId and farmerName are required",
      });
    }

    const listing = await Listing.create({
      commodity,
      quantity,
      price,
      farmAddress,
      farmerId,      // TEMP string (f1)
      farmerName,   // "Demo Farmer"
      negotiationAllowed
    });

    res.status(201).json({ listing });
  } catch (err) {
    console.error("Create listing error:", err);
    res.status(500).json({ message: "Listing creation failed" });
  }
};

exports.getFarmerListings = async (req, res) => {
  try {
    console.log("[Controller] getFarmerListings called");
    console.log("[Controller] req.query:", req.query);

    const { farmerId } = req.query;

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: "farmerId is required"
      });
    }
     console.log("[Controller] querying DB with farmerId:", farmerId);
    const listings = await Listing.find({ farmerId })
      .sort({ createdAt: -1 });
    console.log("[Controller] listings found:", listings.length);
    res.status(200).json({
      success: true,
      data: listings
    });
  } catch (error) {
    console.error("Get farmer listings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch farmer listings"
    });
  }
};

// exports.getListings = async (req, res, next) => {
//   try {
//     // add query filters if provided
//     const { crop, state } = req.query;
//     const filter = {};
//     if (crop) filter.commodity = new RegExp(crop, 'i');
//     if (state) filter.location = new RegExp(state, 'i');
//     const listings = await Listing.find(filter).sort({ date: -1 }).limit(500);
//     res.json(listings);
//   } catch (err) {
//     next(err);
//   }
// };
exports.getAllListings = async (req, res) => {
  try {
    console.log("🌍 [Marketplace] Fetching all listings");

    const listings = await Listing.find({
      status: "active"   // only show active listings
    })
      .sort({ createdAt: -1 }); // newest first

    console.log("📦 [Marketplace] Listings found:", listings.length);

    res.status(200).json({
      success: true,
      data: listings
    });
  } catch (error) {
    console.error("❌ [Marketplace] getAllListings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch marketplace listings"
    });
  }
};
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Not found' });
    res.json(listing);
  } catch (err) {
    next(err);
  }
};
/* DELETE LISTING */
exports.deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
}

/* UPDATE LISTING */
exports.updateListing=async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
}
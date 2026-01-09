
const Proposal = require("../models/Proposal");
const Contract = require("../models/Contract");

exports.createProposal = async (req, res) => {
  try {
    const {
      listingId,
      listing,
      commodity,
      negotiation,
      buyerId,
      buyerName,
      farmerId,
      farmerName,
      offerPrice,
      quantity,
      unit,
      deliveryAddress,
      pickupDate,
      note
    } = req.body;

    // 🛑 BASIC VALIDATION
    if (!buyerId || !buyerName || !offerPrice || !listing) {
      return res.status(400).json({
        message: "Missing required proposal fields"
      });
    }

    const proposal = await Proposal.create({
      listingId,
      listing,
      commodity,
      negotiation,
      buyerId,
      buyerName,
      buyerId,
      farmerId,
      farmerName: req.body.farmerName?.trim(),
      offerPrice,
      quantity,
      unit,
      deliveryAddress,
      pickupDate,
      note,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      proposal
    });

  } catch (err) {
    console.error("❌ Proposal creation error:", err);
    res.status(500).json({
      message: "Proposal creation failed",
      error: err.message
    });
  }
};


// exports.getFarmerProposals = async (req, res) => {
//   try {
//     // const { farmerName, buyerId } = req.query;
//      const { farmerName } = req.query;


//     let filter = {};
//     if (farmerName) filter.farmerName = farmerName;
//     if (buyerId) filter.buyerId = buyerId;

//     const proposals = await Proposal.find(filter).sort({ createdAt: -1 });

//     res.json({ proposals });
//   } catch (err) {
//     console.error("❌ Fetch proposals error:", err);
//     res.status(500).json({ message: "Failed to fetch proposals" });
//   }
// };
// exports.getFarmerProposals = async (req, res) => {
//   try {
//     const { farmerName } = req.query;
//     //const farmerName = req.query.farmerName?.trim();
//       console.log(farmerName);

//     if (!farmerName) {
//       return res.status(400).json({ message: "farmerName is required" });
//     }

//     const proposals = await Proposal.find({ sellerName: farmerName.trim() })
//       .sort({ createdAt: -1 });

//     res.json({ proposals });
//   } catch (err) {
//     console.error("❌ Fetch proposals error:", err);
//     res.status(500).json({ message: "Failed to fetch proposals" });
//   }
// };

// exports.getFarmerProposals = async (req, res) => {
//   try {
//     console.log("🔥 Incoming query:", req.query); // <-- LOG 1

//     const farmerName = req.query.farmerName?.trim();
//     console.log("👨‍🌾 Parsed farmerName:", farmerName); // <-- LOG 2

//     const proposals = await Proposal.find({
//       sellerName: farmerName
//     });

//     console.log("📦 Proposals found:", proposals); // <-- LOG 3

//     res.json(proposals);
//   } catch (err) {
//     console.error("❌ Error fetching proposals:", err);
//     res.status(500).json({ message: "Failed to fetch proposals" });
//   }
// };

exports.getFarmerProposals = async (req, res) => {
  try {
    const rawName = req.query.farmerName;
    console.log("🔥 Raw farmerName:", JSON.stringify(rawName));

    const farmerName = rawName?.trim(); // ✅ FIX
    console.log("✅ Trimmed farmerName:", JSON.stringify(farmerName));

    const proposals = await Proposal.find({
      sellerName: farmerName
    });

    console.log("📦 Found proposals:", proposals.length);

    res.json(proposals);
  } catch (err) {
    console.error("❌ Error fetching proposals:", err);
    res.status(500).json({ message: "Failed to fetch proposals" });
  }
};



// exports.updateProposalStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const proposal = await Proposal.findByIdAndUpdate(
//     id,
//     { status },
//     { new: true }
//   );

//   res.json(proposal);
// };
exports.updateProposalStatus = async (req, res) => {
  console.log("🔥 PATCH HIT");
  console.log("ID:", req.params.id);
  console.log("BODY:", req.body);
  try {
    const { status } = req.body;

    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json({ proposal });
  } catch (err) {
    console.error("Update proposal error:", err);
    res.status(500).json({ message: "Failed to update proposal" });
  }
};

exports.getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });

    res.status(200).json(proposals);
  } catch (err) {
    console.error("❌ getAllProposals error:", err);
    res.status(500).json({ message: "Failed to fetch proposals" });
  }
};

// exports.createContractFromProposal = async (req, res) => {
//   const { proposalId } = req.params;

//   const proposal = await Proposal.findById(proposalId);
//   if (!proposal) return res.status(404).json({ message: "Proposal not found" });

//   proposal.status = "accepted";
//   await proposal.save();

//   const contract = await contract.create({
//     proposalId: proposal._id,
//     buyerId: proposal.buyerId,
//    // farmerId: proposal.farmerId,
//     contractData: {
//       commodity: proposal.commodity,
//       quantity: proposal.quantity,
//       price: proposal.offerPrice,
//       pickupDate: proposal.pickupDate,
//       location: proposal.location
//     }
//   });

//   res.json(contract);
// };

// controllers/proposalController.js


exports.createContractFromProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;

    console.log("📌 Creating contract for proposal:", proposalId);

    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (proposal.status !== "accepted") {
      return res.status(400).json({
        message: "Proposal must be accepted before contract creation"
      });
    }

    // 🚫 Prevent duplicate contracts
    const existing = await Contract.findOne({ proposalId });
    if (existing) {
      return res.json(existing);
    }

    const contract = await Contract.create({
      proposalId: proposal._id,

      buyerId: proposal.buyerId,
      buyerName: proposal.buyerName,

      farmerId: proposal.farmerId,
      farmerName: proposal.farmerName,

      commodity: proposal.listing?.commodity,
      price:proposal.listing?.price,

      quantity: proposal.quantity,
      unit: proposal.unit,
      offerPrice: proposal.offerPrice,
      deliveryAddress:proposal.deliveryAddress,
      pickupDate: proposal.pickupDate,
      farmAddress: proposal.listing?.farmAddress
    });

    res.status(201).json(contract);
  } catch (err) {
    console.error("❌ Contract creation failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

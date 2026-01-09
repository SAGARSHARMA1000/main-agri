const Proposal = require('../models/Proposal');
const Contract = require('../models/Contract');
const Listing = require('../models/Listing');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generatePdf = require("../utils/generateContractPdf");


// multer storage for contract PDFs (local)
// const uploadDir = process.env.UPLOAD_DIR || './uploads';
// const contractDir = path.join(uploadDir, 'contracts');
// if (!fs.existsSync(contractDir)) fs.mkdirSync(contractDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, contractDir);
//   },
//   filename: function (req, file, cb) {
//     const name = `${Date.now()}_${file.originalname.replace(/\s+/g,'_')}`;
//     cb(null, name);
//   }
// });
// const upload = multer({ storage });

// exports.createContractFromProposal = async (req, res, next) => {
//   try {
//     const { proposalId } = req.body;
//     const proposal = await Proposal.findById(proposalId).populate('listing');
//     if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

//     // Create contract
//     const listing = proposal.listing ? await Listing.findById(proposal.listing._id) : null;
//     const totalAmount = proposal.price * parseInt((proposal.quantity || '1').split(' ')[0] || 1);

//     const contract = await Contract.create({
//       proposal: proposal._id,
//       listingSnapshot: listing ? listing.toObject() : {},
//       farmer: listing ? listing.seller : null,
//       buyer: proposal.buyer,
//       pricePerQtl: proposal.price,
//       quantity: proposal.quantity,
//       totalAmount,
//       state: 'draft',
//       audit: [{ actor: req.user._id, action: 'contract_created', ts: new Date() }]
//     });

//     // mark proposal as accepted
//     proposal.status = 'accepted';
//     await proposal.save();

//     res.status(201).json(contract);
//   } catch (err) {
//     next(err);
//   }
// };

// // upload contract PDF
// exports.uploadContractPdf = [
//   upload.single('contractPdf'),
//   async (req, res, next) => {
//     try {
//       const contractId = req.params.id;
//       const contract = await Contract.findById(contractId);
//       if (!contract) return res.status(404).json({ message: 'Contract not found' });

//       if (!req.file) return res.status(400).json({ message: 'No file' });

//       contract.contractPdf = {
//         url: `/uploads/contracts/${req.file.filename}`,
//         filename: req.file.filename
//       };
//       await contract.save();
//       res.json(contract);
//     } catch (err) {
//       next(err);
//     }
//   }
// ];

// exports.signContract = async (req, res, next) => {
//   try {
//     const contractId = req.params.id;
//     const { signer, userId } = req.body; // signer: 'farmer'|'buyer'
//     const contract = await Contract.findById(contractId);
//     if (!contract) return res.status(404).json({ message: 'Contract not found' });

//     // update signatures
//     if (signer === 'farmer') {
//       contract.signatures.farmer = { signed: true, at: new Date() };
//     } else if (signer === 'buyer') {
//       contract.signatures.buyer = { signed: true, at: new Date() };
//     } else {
//       return res.status(400).json({ message: 'Invalid signer' });
//     }

//     // If both signed, set state -> active
//     if (contract.signatures.farmer?.signed && contract.signatures.buyer?.signed) {
//       contract.state = 'active';
//     }

//     contract.audit.push({ actor: req.user._id, action: `signed_by_${signer}`, ts: new Date() });
//     await contract.save();
//     res.json(contract);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getContract = async (req, res, next) => {
//   try {
//     const contract = await Contract.findById(req.params.id).populate('proposal listingSnapshot');
//     if (!contract) return res.status(404).json({ message: 'Not found' });
//     res.json(contract);
//   } catch (err) {
//     next(err);
//   }
// };
exports.getContractByProposal = async (req, res) => {
  const contract = await Contract.findOne({
    proposalId: req.params.proposalId
  });

  if (!contract) {
    return res.status(404).json({ message: "Contract not found" });
  }

  res.json(contract);
};

// exports.buyerSignContract = async (req, res) => {
//   try {
//     const { contractId } = req.params;
//     const { name, signatureImage } = req.body;

//     const contract = await Contract.findById(contractId);
//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }

//     // Buyer signs
//     contract.signatures.buyer = {
//       signed: true,
//       name:name,
//       //image: signatureImage,
//       image: req.file.path,
//       signedAt: new Date()
//     };

//     contract.status = "sent_to_farmer";

//     await contract.save();

//     console.log("✍ Buyer signed contract:", contract._id);

//     res.json({
//       success: true,
//       contract
//     });

//   } catch (err) {
//     console.error("Buyer sign error:", err);
//     res.status(500).json({ message: "Failed to sign contract" });
//   }
// };

exports.buyerSignContract = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file); // 👈 DEBUG

    if (!req.file) {
      return res.status(400).json({
        message: "Signature file not received",
      });
    }

    const { name } = req.body;
    const { contractId } = req.params;

    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // contract.buyerSignature = {
    //   name:name,
    //   image: req.file.path, // ✅ now safe
    //   signed: true,
    //   signedAt: new Date(),
    // };
        // ✅ SAVE EXACTLY AS PER SCHEMA
    contract.signatures.buyerName = name;
    contract.signatures.buyerSignatureUrl = req.file.path;

    contract.status = "sent_to_farmer";

    await contract.save();

    res.json({ message: "Buyer signed successfully", contract });
  } catch (err) {
    console.error("Buyer sign error:", err);
    res.status(500).json({ message: "Buyer sign failed" });
  }
};


// exports.getFarmerContracts = async (req, res) => {
//   const { farmerId } = req.params;

//   const contracts = await Contract.find({
//     "farmer.id": farmerId
//   });

//   res.json(contracts);
// };
exports.getFarmerContracts = async (req, res) => {
  try {
    const { farmerId } = req.params;

    console.log("🔍 Fetching contracts for farmerId:", farmerId);

    const contracts = await Contract.find({
      farmerId: farmerId
    });

    console.log("📦 Contracts found:", contracts.length);

    res.json(contracts);
  } catch (err) {
    console.error("❌ Error fetching farmer contracts:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.farmerSignContract = async (req, res) => {
  try {
     console.log("🧾 Params:", req.params);
     console.log("🧾 Body:", req.body);
     console.log("🧾 File:", req.file);
    const { contractId } = req.params;
    const name = req.body?.name;
    //const { name } = req.body;
    if (!req.file || !name) {
    return res.status(400).json({
      message: "Signature image and farmer name are required"
    });
  }

    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Safety: buyer must sign first
    // if (!contract.signatures.buyer?.signed) {
    //   return res.status(400).json({
    //     message: "Buyer signature missing"
    //   });
    // }

    // contract.signatures.farmer = {
    //   name:name,
    //   image: req.file.path,
    //   signed: true,
    //   signedAt: new Date()
    // };
    contract.signatures.farmerName = name;
    contract.signatures.farmerSignatureUrl = req.file.path.replace(/\\/g, "/");

    contract.status = "active";
     // 🔥 Generate PDF
    const pdfPath = await generatePdf(contract);
    contract.pdf = {
      url: pdfPath,
      generatedAt: new Date()
    };

    await contract.save();

    console.log("🌱 Farmer signed contract:", contract._id);

    res.json({
      success: true,
      contract
    });

  } catch (err) {
    console.error("Farmer sign error:", err);
    res.status(500).json({ message: "Failed to sign contract" });
  }
};
exports.getContractById = async (req, res) => {
  try {
    const { contractId } = req.params;

    console.log("📄 Fetching contract:", contractId);

    // Safety check
    if (!contractId) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required"
      });
    }

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found"
      });
    }

    res.status(200).json({
      success: true,
      contract
    });

  } catch (error) {
    console.error("❌ getContractById error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch contract"
    });
  }
};
exports.getBuyerContracts = async (req, res) => {
  try{
  const { buyerId } = req.params;
  console.log("🔍 Fetching contracts for buyerId:", buyerId);
  const contracts = await Contract.find({ buyerId }).sort({ createdAt: -1 });
  console.log("📦 Contracts found:", contracts.length);
  res.json(contracts);}
  catch (err) {
    console.error("❌ Error fetching buyer contracts:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.rejectContract = (req, res) => {
  Contract.findByIdAndUpdate(
    req.params.contractId,
    { status: "rejected" },
    { new: true }
  )
    .then(contract => res.json({ contract }))
    .catch(err => res.status(500).json({ message: "Reject failed" }));
};

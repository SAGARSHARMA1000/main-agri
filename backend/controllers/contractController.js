const Proposal = require('../models/Proposal');
const Contract = require('../models/Contract');
const Listing = require('../models/Listing');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generatePdf = require("../utils/generateContractPdf");

exports.getContractByProposal = async (req, res) => {
  const contract = await Contract.findOne({
    proposalId: req.params.proposalId
  });

  if (!contract) {
    return res.status(404).json({ message: "Contract not found" });
  }

  res.json(contract);
};


exports.buyerSignContract = async (req, res) => {
  try {
   // console.log("BODY:", req.body);
   // console.log("FILE:", req.file); // 👈 DEBUG

    if (!req.file || !req.body.name) {
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
   // Prevent re-signing
    if (contract.signatures?.buyerSignatureUrl) {
      return res.status(400).json({
        message: "Buyer already signed",
      });
    }
  
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


exports.getFarmerContracts = async (req, res) => {
  try {
    const { farmerId } = req.params;

   // console.log("🔍 Fetching contracts for farmerId:", farmerId);

    const contracts = await Contract.find({
      farmerId: farmerId
    });

   // console.log("📦 Contracts found:", contracts.length);

    res.json(contracts);
  } catch (err) {
    console.error("❌ Error fetching farmer contracts:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.farmerSignContract = async (req, res) => {
  try {
   //  console.log("🧾 Params:", req.params);
   //  console.log("🧾 Body:", req.body);
    // console.log("🧾 File:", req.file);
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

     // Ensure buyer signed first
    if (!contract.signatures?.buyerSignatureUrl) {
      return res.status(400).json({
        message: "Buyer must sign first",
      });
    }

    // Prevent re-signing
    if (contract.signatures?.farmerSignatureUrl) {
      return res.status(400).json({
        message: "Farmer already signed",
      });
    }
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

    //console.log("🌱 Farmer signed contract:", contract._id);

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

    //console.log("📄 Fetching contract:", contractId);

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
 // console.log("🔍 Fetching contracts for buyerId:", buyerId);
  const contracts = await Contract.find({ buyerId }).sort({ createdAt: -1 });
  //console.log("📦 Contracts found:", contracts.length);
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

const express = require('express');
const router = express.Router();
//const { authMiddleware } = require('../middleware/auth');
const upload = require("../middleware/upload");
const {getContractByProposal,buyerSignContract,getFarmerContracts, 
    farmerSignContract,getContractById,getBuyerContracts,rejectContract} = require('../controllers/contractController');

// Create contract from proposal
//router.post('/', authMiddleware, contractController.createContractFromProposal);

// Upload PDF (multipart/form-data)
//router.post('/:id/upload', authMiddleware, contractController.uploadContractPdf);

// Sign contract
//router.post('/:id/sign', authMiddleware, contractController.signContract);

// Get contract
//router.get('/:id', authMiddleware, contractController.getContract);
// router.get("/proposal/:proposalId", auth, getContractByProposal);
// router.post("/:contractId/farmer-sign", auth, farmerSignContract);
router.get("/proposal/:proposalId",  getContractByProposal);
router.post("/:contractId/buyer-sign",upload.single("signature"), buyerSignContract);
router.get("/farmer/:farmerId", getFarmerContracts);
router.post("/:contractId/farmer-sign",upload.single("signature"), farmerSignContract);
router.get("/:contractId", getContractById);
router.get("/buyer/:buyerId", getBuyerContracts);
router.post("/:contractId/reject", rejectContract);

module.exports = router;

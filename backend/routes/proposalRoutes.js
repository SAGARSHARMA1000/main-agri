const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { createProposal, getFarmerProposals,getAllProposals ,updateProposalStatus,createContractFromProposal} = require('../controllers/proposalController');

// router.post('/', authMiddleware, sendProposal);
// router.get('/', authMiddleware, getProposals);
router.post("/", createProposal);
router.get("/", getFarmerProposals);
router.get("/pro", getAllProposals);
router.patch("/:id/status", updateProposalStatus);
router.post("/:proposalId/createContract", createContractFromProposal);

module.exports = router;

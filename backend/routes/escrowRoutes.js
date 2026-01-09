const express = require('express');
const router = express.Router();
//const { authMiddleware } = require('../middleware/auth');
const {depositEscrow,releaseEscrow,getFarmerEscrowDashboard,confirmDelivery,getBuyerPaymentDetails
    ,getBuyerEscrows
} = require('../controllers/escrowController');

// router.post('/:id/deposit', authMiddleware, paymentController.depositEscrow);
// router.get('/:id', authMiddleware, paymentController.getPaymentsForContract);
router.post("/deposit", depositEscrow);
//router.get("/buyer/:buyerId", getBuyerEscrowDashboard);
//router.post("/release/:escrowId",releaseEscrow);
router.post("/confirm-delivery", confirmDelivery);
router.get("/buyer/:buyerId", getBuyerPaymentDetails);
router.get("/farmer/:farmerId", getFarmerEscrowDashboard);
router.get("/buyer/v1/:buyerId", getBuyerEscrows);

module.exports = router;

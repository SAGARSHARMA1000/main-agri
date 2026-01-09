const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/deliveryController");

// PLATFORM ACTIONS
router.get("/admin/all", ctrl.getAllDeliveries);
router.post("/admin/schedule-pickup", ctrl.schedulePickup);
router.post("/admin/collected", ctrl.collectedFromFarmer);
router.post("/admin/in-transit", ctrl.markInTransit);
router.post("/admin/delivered", ctrl.deliveredToBuyer);

// BUYER ACTIONS
router.post("/buyer/confirm", ctrl.buyerConfirm);
router.post("/buyer/report-issue", ctrl.reportIssue);

// FETCH
router.get("/farmer/:farmerId", ctrl.getFarmerDeliveries);
router.get("/buyer/:buyerId", ctrl.getBuyerDeliveries);

module.exports = router;

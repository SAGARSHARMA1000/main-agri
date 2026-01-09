// const Escrow = require('../models/Escrow');
// const Contract = require('../models/Contract');

// exports.depositEscrow = async (req, res, next) => {
//   try {
//     const contractId = req.params.id;
//     const { method } = req.body;
//     const contract = await Contract.findById(contractId);
//     if (!contract) return res.status(404).json({ message: 'Contract not found' });

//     const amount = contract.totalAmount || contract.pricePerQtl * parseInt((contract.quantity||'1').split(' ')[0]);

//     // create payment record (simulated)
//     const payment = await Payment.create({
//       contract: contract._id,
//       user: req.user._id,
//       gateway: method || 'manual',
//       amount,
//       status: 'succeeded',
//       gatewayResponse: { simulated: true, method }
//     });

//     // update contract escrow
//     contract.escrow = { amount, currency: 'INR', paymentRef: payment._id.toString(), fundedAt: new Date() };
//     contract.state = 'escrow_funded';
//     contract.audit.push({ actor: req.user._id, action: 'escrow_funded', ts: new Date() });
//     await contract.save();

//     res.json({ payment, contract });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getPaymentsForContract = async (req, res, next) => {
//   try {
//     const contractId = req.params.id;
//     const payments = await Payment.find({ contract: contractId }).sort({ createdAt: -1 });
//     res.json(payments);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.depositEscrow = async (req, res) => {
//   const { contractId, amount, buyerId, farmerId } = req.body;

//   const escrow = await Escrow.create({
//     contractId,
//     buyerId,
//     farmerId,
//     amount,
//     status: "deposited",
//     depositedAt: new Date()
//   });

//   res.json({ success: true, escrow });
// };

// exports.releaseEscrow = async (req, res) => {
//   const { escrowId } = req.params;

//   const escrow = await Escrow.findById(escrowId);
//   escrow.status = "released";
//   escrow.releasedAt = new Date();
//   await escrow.save();

//   res.json({ success: true });
// };


// exports.depositEscrow = async (req, res) => {
//   try {
//     const { contractId, buyerId, buyerName, farmerId,farmerName, amount } = req.body;

//     const escrow = await Escrow.create({
//       contractId,
//       buyerId,
//       buyerName,
//       farmerId,
//       farmerName,
//       amount
//     });

//     // await Transaction.create({
//     //   userId: buyerId,
//     //   escrowId: escrow._id,
//     //   type: "debit",
//     //   amount,
//     //   description: "Escrow Deposit",
//     //   status: "Locked"
//     // });

//     res.json({ success: true, escrow });
//   } catch (err) {
//     console.error("❌ Escrow deposit error:", err);
//     res.status(500).json({ message: "Escrow deposit failed" });
//   }
// };



// exports.depositEscrow = async (req, res) => {
//   try {
//     const {
//       contractId,
//       buyerId,
//       buyerName,
//       farmerId,
//       farmerName,
//       amount,
//       releaseCondition
//     } = req.body;

//     // ❌ Prevent duplicate escrow for same contract
//     const existing = await Escrow.findOne({ contractId });
//     if (existing) {
//       return res.status(400).json({
//         message: "Escrow already exists for this contract"
//       });
//     }

//     // ✅ Create escrow
//     const escrow = await Escrow.create({
//       contractId,
//       buyerId,
//       buyerName,
//       farmerId,
//       farmerName,
//       amount,
//       status: "locked",
//       releaseCondition,
//       depositedAt: new Date()
//     });
//     res.status(201).json({
//       success: true,
//       escrow
//     });

//   } catch (err) {
//     console.error("Escrow creation failed", err);
//     res.status(500).json({ message: "Escrow deposit failed" });
//   }
// };
const Escrow = require("../models/Escrow");
const Delivery = require("../models/Delivery");
const { nanoid } = require("nanoid");
const Contract = require("../models/Contract");

exports.depositEscrow = async (req, res) => {
  try {
    const {
      contractId,
      buyerId,
      buyerName,
      farmerId,
      farmerName,
      amount,
      releaseCondition,
      pickupAddress,
      deliveryAddress,
      crop,
      quantity
    } = req.body;

    // ❌ Prevent duplicate escrow
    const existing = await Escrow.findOne({ contractId });
    if (existing) {
      return res.status(400).json({
        message: "Escrow already exists for this contract"
      });
    }

    // ✅ 1️⃣ Create Escrow
    const escrow = await Escrow.create({
      contractId,
      buyerId,
      buyerName,
      farmerId,
      farmerName,
      amount,
      status: "locked",
      releaseCondition,
      depositedAt: new Date()
    });

    // ✅ 2️⃣ Create Delivery (AUTO)
    const delivery = await Delivery.create({
      deliveryId: `DLV-${nanoid(6).toUpperCase()}`,
      contractId,
    
      farmerId,
      buyerId,

      crop,
      quantity,

      escrowAmount: amount,

      pickupAddress,
      deliveryAddress,

      deliveryStatus: "PICKUP_SCHEDULED",

      timeline: [
        { status: "Escrow Deposited" },
        { status: "Pickup Scheduled" }
      ]
    });

    // ✅ Success Response
    res.status(201).json({
      success: true,
      escrow,
      delivery
    });

  } catch (err) {
    console.error("❌ Escrow creation failed", err);
    res.status(500).json({
      message: "Escrow deposit & delivery creation failed"
    });
  }
};

 exports.getBuyerEscrowDashboard = async (req, res) => {
   const { buyerId } = req.params;

   const escrows = await Escrow.find({ buyerId })
    .populate("contractId");

  const transactions = await Transaction.find({ userId: buyerId });

  const lockedAmount = escrows
    .filter(e => e.status === "locked")
    .reduce((sum, e) => sum + e.amount, 0);

  res.json({
    wallet: {
      balance: 10000, // optional later
      lockedInEscrow: lockedAmount
    },
    pendingPayments: escrows,
    transactions
  });
};

exports.confirmDelivery = async (req, res) => {
  const { contractId, buyerId } = req.body;

  const escrow = await Escrow.findOne({
    contractId,
    buyerId,
    status: "locked"
  });

  if (!escrow) {
    return res.status(404).json({ message: "Escrow not found" });
  }

  escrow.deliveryConfirmed = true;
  escrow.deliveryConfirmedAt = new Date();

  // 🔥 Immediate release
  escrow.status = "released";
  escrow.releasedAt = new Date();

  await escrow.save();

  // Credit farmer wallet
  await Transaction.create({
    userId: escrow.farmerId,
    escrowId: escrow._id,
    type: "credit",
    amount: escrow.amount,
    description: "Escrow Released after Delivery",
    status: "Success"
  });

  res.json({ success: true });
};

// controllers/escrow.controller.js
exports.getFarmerEscrowDashboard = async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

    const escrows = await Escrow.find({ farmerId }).sort({ depositedAt: -1 });

    let availableBalance = 0;
    let lockedInEscrow = 0;
    let totalEarnings = 0;

    escrows.forEach(e => {
      if (e.status === "released") {
        availableBalance += e.amount;
        totalEarnings += e.amount;
      }
      if (e.status === "locked") {
        lockedInEscrow += e.amount;
      }
    });

    res.json({
      wallet: {
        availableBalance,
        lockedInEscrow,
        totalEarnings
      },
      escrows
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to load farmer escrow dashboard" });
  }
};
// controllers/payment.controller.js


exports.getBuyerPaymentDetails = async (req, res) => {
  const buyerId = req.params.buyerId;

  const escrows = await Escrow.find({ buyerId })
    .populate("contractId")
    .sort({ depositedAt: -1 });

  if (!escrows.length) {
    return res.json({ hasActivePayment: false });
  }

  const mapped = escrows.map(e => ({
    escrowId: e._id,
    status: e.status,
    amount: e.amount,
    releaseCondition: e.releaseCondition,
    depositedAt: e.depositedAt,
    releasedAt: e.releasedAt,
    contract: {
      id: e.contractId?._id,
      commodity: e.contractId?.commodity,
      quantity: e.contractId?.quantity,
      unit: e.contractId?.unit,
      farmerName: e.contractId?.farmerName,
      location: e.contractId?.location
    }
  }));

  res.json({
    hasActivePayment: true,
    payments: mapped
  });
};

/* ======================================================
   GET ALL ESCROWS FOR BUYER
   ====================================================== */
exports.getBuyerEscrows = async (req, res) => {
  try {
    const { buyerId } = req.params;

    console.log("🔍 Fetching escrows for buyer:", buyerId);

    const escrows = await Escrow.find({ buyerId })
      .sort({ depositedAt: -1 });

    res.json(escrows);
  } catch (err) {
    console.error("❌ Error fetching buyer escrows:", err);
    res.status(500).json({ message: "Failed to fetch escrows" });
  }
};
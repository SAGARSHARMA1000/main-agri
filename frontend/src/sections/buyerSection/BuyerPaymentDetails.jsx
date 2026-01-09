// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ShieldCheck, CreditCard, Loader2 } from "lucide-react";
// import api from "../../services/api";

// export default function BuyerEscrow() {
//   const { contractId } = useParams();
//   const navigate = useNavigate();

//   const [contract, setContract] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");

//   /* ---------------- FETCH CONTRACT ---------------- */

//   useEffect(() => {
//     if (!contractId) {
//       setError("Invalid contract reference.");
//       setLoading(false);
//       return;
//     }

//     console.log("🧾 [BuyerEscrow] Fetching contract:", contractId);

//     const fetchContract = async () => {
//       try {
//         const res = await api.getContractById(contractId);
//         console.log("✅ [BuyerEscrow] Contract fetched:", res.data);

//         setContract(res.data.contract);
//       } catch (err) {
//         console.error("❌ [BuyerEscrow] Fetch failed:", err);
//         setError("Unable to load contract details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

//   /* ---------------- ESCROW DEPOSIT ---------------- */

   const handleDeposit = async () => {
    if (!contract) return;

    setProcessing(true);

    try {
      await api.depositEscrow({
        contractId: contract._id,
        buyerId: contract.buyerId,
        farmerId: contract.farmerId,
        amount: Number(contract.quantity) * Number(contract.offerPrice)
      });

      alert("💰 Escrow funded successfully");
      navigate("/dashboard/buyer/payments");
    } catch (err) {
      console.error("❌ Escrow deposit failed:", err);
      alert("Failed to fund escrow. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

 // /* ---------------- STATES ---------------- */

//   if (loading) {
//     return (
//       <div className="p-8 flex justify-center items-center">
//         <Loader2 className="animate-spin text-gray-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 border border-red-200 rounded text-red-700">
//         {error}
//       </div>
//     );
//   }

//   if (!contract) {
//     return (
//       <div className="p-6 text-gray-600 text-center">
//         No active contract found.
//       </div>
//     );
//   }

//   /* ---------------- CALCULATIONS ---------------- */

//   const totalValue =
//     Number(contract.quantity) * Number(contract.offerPrice);

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow">

//       <div className="flex items-center gap-3 mb-4">
//         <ShieldCheck className="text-emerald-600" />
//         <h2 className="font-bold text-lg">Escrow Payment</h2>
//       </div>

//       <p className="text-sm text-gray-600 mb-4">
//         Funds will be securely held and released to the farmer
//         after successful delivery confirmation.
//       </p>

//       {/* Contract Summary */}
//       <div className="bg-gray-50 p-4 rounded mb-4 space-y-2 text-sm">
//         <p><b>Crop:</b> {contract.commodity}</p>
//         <p><b>Farmer:</b> {contract.farmerName}</p>
//         <p><b>Quantity:</b> {contract.quantity} {contract.unit}</p>
//         <p><b>Price per Unit:</b> ₹{contract.offerPrice}</p>
//         <p className="font-bold text-lg ">
//           Total Value: ₹{totalValue.toLocaleString()}
//         </p>
//       </div>

//       <button
//         onClick={handleDeposit}
//         disabled={processing}
//         className={`w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2 ${
//           processing
//             ? "bg-gray-300 cursor-not-allowed"
//             : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200"
//         }`}
//       >
//         {processing ? (
//           <>Processing...</>
//         ) : (
//           <>
//             <CreditCard size={23} /> Pay amount
//           </>
//         )}
//       </button>
//     </div>
//   );
// }
//2

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ShieldCheck, CreditCard, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../../services/api";

// export default function BuyerEscrow() {
//   const { contractId } = useParams();
//   const navigate = useNavigate();

//   const [contract, setContract] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");

//   /* ---------------- FETCH CONTRACT ---------------- */

//   useEffect(() => {
//     if (!contractId) {
//       setError("Invalid contract reference.");
//       setLoading(false);
//       return;
//     }

//     const fetchContract = async () => {
//       try {
//         const res = await api.getContractById(contractId);
//         setContract(res.data.contract);
//       } catch (err) {
//         setError("Unable to load contract details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

//   /* ---------------- PAY AMOUNT (NO DEPOSIT) ---------------- */

//   const handlePayAmount = () => {
//     setProcessing(true);
    

//     // 🔹 simulate real payment gateway delay
//     setTimeout(() => {
//       setProcessing(false);
//       navigate("/dashboard/buyer/payments");
//     }, 3000);
//   };

//   /* ---------------- STATES ---------------- */

//   if (loading) {
//     return (
//       <div className="p-8 flex justify-center items-center">
//         <Loader2 className="animate-spin text-gray-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 border border-red-200 rounded text-red-700">
//         {error}
//       </div>
//     );
//   }

//   if (!contract) {
//     return (
//       <div className="p-6 text-gray-600 text-center">
//         No active contract found.
//       </div>
//     );
//   }

//   /* ---------------- CALCULATIONS ---------------- */

//   const totalValue =
//     Number(contract.quantity) * Number(contract.offerPrice);

//   /* ---------------- RENDER ---------------- */

//   return (
//     <>
//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow">

//         <div className="flex items-center gap-3 mb-4">
//           <ShieldCheck className="text-emerald-600" />
//           <h2 className="font-bold text-lg">Escrow Payment</h2>
//         </div>

//         <p className="text-sm text-gray-600 mb-4">
//           Funds will be securely held and released to the farmer
//           after successful delivery confirmation.
//         </p>

//         {/* Contract Summary */}
//         <div className="bg-gray-50 p-4 rounded mb-4 space-y-2 text-sm">
//           <p><b>Crop:</b> {contract.commodity}</p>
//           <p><b>Farmer:</b> {contract.farmerName}</p>
//           <p><b>Quantity:</b> {contract.quantity} {contract.unit}</p>
//           <p><b>Price per Unit:</b> ₹{contract.offerPrice}</p>
//           <p className="font-bold text-lg">
//             Total Value: ₹{totalValue.toLocaleString()}
//           </p>
//         </div>

//         <button
//           onClick={handlePayAmount}
//           disabled={processing}
//           className={`w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2 ${
//             processing
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200"
//           }`}
//         >
//           <CreditCard size={22} />
//           Pay ₹{totalValue.toLocaleString()}
//         </button>
//       </div>

//       {/* ---------------- PAYMENT PROCESSING ANIMATION ---------------- */}

//       <AnimatePresence>
//         {processing && (
//           <motion.div
//             className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-xl px-10 py-8 text-center shadow-2xl"
//               animate={{ scale: [1, 1.05, 1] }}
//               transition={{ duration: 1, repeat: Infinity }}
//             >
//               <div className="w-14 h-14 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
//               <h3 className="font-bold text-lg">Redirecting to the Payment Page</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 Please do not refresh the page
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
// escrow page details
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ShieldCheck, CreditCard, Loader2, Lock } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../../services/api";

// export default function BuyerEscrow() {
//   const { contractId } = useParams();
//   const navigate = useNavigate();

//   const [contract, setContract] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [redirecting, setRedirecting] = useState(false);
//   const [error, setError] = useState("");

//   /* ---------------- FETCH CONTRACT ---------------- */

//   useEffect(() => {
//     if (!contractId) {
//       setError("Invalid contract reference.");
//       setLoading(false);
//       return;
//     }

//     const fetchContract = async () => {
//       try {
//         const res = await api.getContractById(contractId);
//         setContract(res.data.contract);
//       } catch (err) {
//         setError("Unable to load contract details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

//   /* ---------------- PAY → REDIRECT ---------------- */

//   const handlePayRedirect = async () => {
//     setRedirecting(true);
//     if (!contract) return;

//    // setProcessing(true);

//     try {
//       await api.depositEscrow({
//         contractId: contract._id,
//         buyerId: contract.buyerId,
//         buyerName:contract.buyerName,
//         farmerId: contract.farmerId,
//         farmerName:contract.farmerName,
//         amount: Number(contract.quantity) * Number(contract.offerPrice)
//       });
//     } catch (err) {
//       console.error("❌ Escrow deposit failed:", err);
//      // alert("Failed to fund escrow. Please try again.");
//     } finally {
//       //setProcessing(false);
//     }

//     // realistic gateway redirect delay
//     setTimeout(() => {
//       navigate(`/dashboard/buyer/payments`);
//     }, 2500);
//   };

//   /* ---------------- STATES ---------------- */

//   if (loading) {
//     return (
//       <div className="p-8 flex justify-center items-center">
//         <Loader2 className="animate-spin text-gray-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 border border-red-200 rounded text-red-700">
//         {error}
//       </div>
//     );
//   }

//   if (!contract) {
//     return (
//       <div className="p-6 text-gray-600 text-center">
//         No active contract found.
//       </div>
//     );
//   }

//   /* ---------------- CALCULATIONS ---------------- */

//   const totalValue =
//     Number(contract.quantity) * Number(contract.offerPrice);

//   /* ---------------- RENDER ---------------- */

//   return (
//     <>
//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow">

//         <div className="flex items-center gap-3 mb-4">
//           <ShieldCheck className="text-emerald-600" />
//           <h2 className="font-bold text-lg">Escrow Payment</h2>
//         </div>

//         <p className="text-sm text-gray-600 mb-4">
//           Funds will be securely held and released to the farmer
//           after successful delivery confirmation.
//         </p>

//         {/* Contract Summary */}
//         <div className="bg-gray-50 p-4 rounded mb-4 space-y-2 text-sm">
//           <p><b>Crop:</b> {contract.commodity}</p>
//           <p><b>Farmer:</b> {contract.farmerName}</p>
//           <p><b>Quantity:</b> {contract.quantity} {contract.unit}</p>
//           <p><b>Price per Unit:</b> ₹{contract.offerPrice}</p>
//           <p className="font-bold text-lg">
//             Total Value: ₹{totalValue.toLocaleString()}
//           </p>
//         </div>

//         <button
//           onClick={handlePayRedirect}
//           disabled={redirecting}
//           className={`w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2 ${
//             redirecting
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200"
//           }`}
//         >
//           <CreditCard size={23} />
//           Pay amount
//         </button>
//       </div>

//       {/* ---------------- REDIRECT ANIMATION OVERLAY ---------------- */}

//       <AnimatePresence>
//         {redirecting && (
//           <motion.div
//             className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-xl px-10 py-8 text-center shadow-2xl"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="w-14 h-14 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>

//               <h3 className="font-bold text-lg flex items-center justify-center gap-2">
//                 <Lock size={18} className="text-emerald-600" />
//                 Redirecting to Secure Payment
//               </h3>

//               <p className="text-sm text-gray-500 mt-1">
//                 Please wait, do not refresh the page
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
//31/12/2025
// import React, { useEffect, useState } from "react";
// import {
//   ShieldCheck,
//   FileText,
//   CheckCircle,
//   Clock,
//   MapPin,
//   Package
// } from "lucide-react";
// import api from "../../services/api";
// import { useOutletContext, useNavigate,useParams } from "react-router-dom";

// export default function BuyerPaymentDetails() {
//   const { user } = useOutletContext();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { contractId } = useParams(); // ✅ works


//   useEffect(() => {
//     if (!user?.id) return;

//     const fetchPayments = async () => {
//       const res = await api.getBuyerPaymentDetails(user.id);
//       setData(res.data);
//       setLoading(false);
//     };

//     fetchPayments();
//   }, [user?.id]);

//   if (loading) {
//     return <div className="p-8 text-center">Loading payment details…</div>;
//   }

//   /* ---------------- EMPTY STATE ---------------- */

//   if (!data?.hasActivePayment) {
//     return (
//       <div className="max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow text-center animate-fade-in">
//         <ShieldCheck size={48} className="mx-auto text-emerald-600 mb-4" />
//         <h2 className="text-2xl font-bold mb-2">No Active Payments</h2>
//         <p className="text-gray-600 mb-6">
//           You currently have no pending or locked escrow payments.
//         </p>

//         <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
//           <div className="p-4 border rounded-lg">
//             <FileText className="mx-auto mb-2 text-blue-500" />
//             Refunds processed automatically if contracts are cancelled.
//           </div>
//           <div className="p-4 border rounded-lg">
//             <ShieldCheck className="mx-auto mb-2 text-emerald-500" />
//             Payments are protected in RBI-regulated escrow accounts.
//           </div>
//           <div className="p-4 border rounded-lg">
//             <CheckCircle className="mx-auto mb-2 text-purple-500" />
//             No hidden charges or manual follow-ups required.
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- PAYMENT DETAILS ---------------- */

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 ">
//       {data.payments.map(payment => (
//         <div
//           key={payment.escrowId}
//           className="bg-white rounded-2xl border shadow-sm p-6 animate-slide-up"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-bold text-lg flex items-center gap-2">
//               <Package /> {payment.contract.commodity}
//             </h3>
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-bold ${
//                 payment.status === "Locked"
//                   ? "bg-yellow-100 text-yellow-700"
//                   : payment.status === "Released"
//                   ? "bg-emerald-100 text-emerald-700"
//                   : "bg-gray-100 text-gray-600"
//               }`}
//             >
//               {payment.status}
//             </span>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6 text-sm">
//             <div>
//               <p className="text-gray-500">Farmer</p>
//               <p className="font-medium">{payment.contract.farmerName}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Quantity</p>
//               <p className="font-medium">
//                 {payment.contract.quantity} {payment.contract.unit}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-500">Amount Paid</p>
//               <p className="font-bold text-lg">
//                 ₹{payment.amount.toLocaleString()}
//               </p>
//             </div>
//           </div>

//           <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
//             <span className="flex items-center gap-1">
//               <Clock size={14} /> Paid on{" "}
//               {new Date(payment.depositedAt).toDateString()}
//             </span>
//             <span className="flex items-center gap-1">
//               <MapPin size={14} /> {payment.contract.location}
//             </span>
//             <span className="flex items-center gap-1">
//               <ShieldCheck size={14} /> {payment.releaseCondition}
//             </span>
//           </div>
//         </div>
//       ))}
//       <div className="flex justify-center">
//       <button
//       onClick={() => navigate(`/dashboard/buyer/payments/${contractId}`)}
//       className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700"
//     >
//       Pay amount
//     </button>
//     </div>
       
//     </div>
//   );
// }
//4/1
// import React, { useEffect, useState } from "react";
// import {
//   ShieldCheck,
//   FileText,
//   CheckCircle,
//   Clock,
//   MapPin,
//   Package,
//   AlertCircle
// } from "lucide-react";
// import api from "../../services/api";
// import { useOutletContext, useNavigate } from "react-router-dom";

// export default function BuyerPaymentDetails() {
//   const { user } = useOutletContext();
//   const navigate = useNavigate();

//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- FETCH BUYER CONTRACTS ---------------- */

//   useEffect(() => {
//     if (!user?.id) return;

//     const fetchContracts = async () => {
//       try {
//         const res = await api.getBuyerContracts(user.id);
//         setContracts(res.data);
//       } catch (err) {
//         console.error("❌ Failed to load buyer contracts", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContracts();
//   }, [user?.id]);

//   if (loading) {
//     return <div className="p-8 text-center">Loading payment details…</div>;
//   }

//   /* ---------------- DERIVED DATA ---------------- */

//   const activeContracts = contracts.filter(
//     c => c.status === "active"
//   );

//   const hasActiveContracts = activeContracts.length > 0;

//   /* ---------------- EMPTY STATE ---------------- */

//   if (!hasActiveContracts) {
//     return (
//       <div className="max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow text-center animate-fade-in">
//         <ShieldCheck size={48} className="mx-auto text-emerald-600 mb-4" />
//         <h2 className="text-2xl font-bold mb-2">No Pending Payments</h2>
//         <p className="text-gray-600 mb-6">
//           You currently have no active contracts that require payment.
//         </p>

//         <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
//           <div className="p-4 border rounded-lg">
//             <FileText className="mx-auto mb-2 text-blue-500" />
//             Payments are triggered only after contract activation.
//           </div>
//           <div className="p-4 border rounded-lg">
//             <ShieldCheck className="mx-auto mb-2 text-emerald-500" />
//             Funds are protected in escrow until delivery is confirmed.
//           </div>
//           <div className="p-4 border rounded-lg">
//             <CheckCircle className="mx-auto mb-2 text-purple-500" />
//             No action required from your side right now.
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- PAYMENT DETAILS ---------------- */

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">

//       {activeContracts.map(contract => {
//         const escrow = contract.escrow || null;
//         const payableAmount =
//           Number(contract.quantity) * Number(contract.offerPrice);

//         return (
//           <div
//             key={contract._id}
//             className="bg-white rounded-2xl border shadow-sm p-6 animate-slide-up"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-bold text-lg flex items-center gap-2">
//                 <Package /> {contract.commodity}
//               </h3>

//               {escrow ? (
//                 <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
//                   {escrow.status}
//                 </span>
//               ) : (
//                 <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
//                   Payment Due
//                 </span>
//               )}
//             </div>

//             <div className="grid md:grid-cols-3 gap-6 text-sm">
//               <div>
//                 <p className="text-gray-500">Farmer</p>
//                 <p className="font-medium">{contract.farmerName}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500">Quantity</p>
//                 <p className="font-medium">
//                   {contract.quantity} {contract.unit}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-gray-500">
//                   {escrow ? "Amount Paid" : "Amount Payable"}
//                 </p>
//                 <p className="font-bold text-lg">
//                   ₹{payableAmount.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
//               {escrow && escrow.depositedAt && (
//                 <span className="flex items-center gap-1">
//                   <Clock size={14} />
//                   Paid on{" "}
//                   {new Date(escrow.depositedAt).toLocaleDateString("en-IN")}
//                 </span>
//               )}

//               <span className="flex items-center gap-1">
//                 <MapPin size={14} /> {contract.location}
//               </span>

//               <span className="flex items-center gap-1">
//                 <ShieldCheck size={14} /> Delivery Confirmation
//               </span>
//             </div>

//             {!escrow && (
//               <div className="mt-6">
//                 <button
//                   onClick={() =>
//                     navigate(`/dashboard/buyer/payments/${contract._id}`)
//                   }
//                   className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-2"
//                 >
//                   Pay Amount
//                   <AlertCircle size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo } from "react";
import {
  ShieldCheck,
  FileText,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  AlertCircle
} from "lucide-react";
import api from "../../services/api";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function BuyerPaymentDetails() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const [contracts, setContracts] = useState([]);
  const [escrows, setEscrows] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH CONTRACTS + ESCROWS ---------------- */

  useEffect(() => {
    if (!user?.id) return;

    const loadData = async () => {
      try {
        const [contractsRes, escrowRes] = await Promise.all([
          api.getBuyerContracts(user.id),
          api.getBuyerEscrows(user.id)
        ]);

        setContracts(contractsRes.data || []);
        setEscrows(escrowRes.data || []);
      } catch (err) {
        console.error("❌ Failed to load buyer payment data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  /* ---------------- HELPERS ---------------- */

  const getEscrowForContract = (contractId) =>
    escrows.find(e => e.contractId === contractId) || null;

  const activeContracts = useMemo(
    () => contracts.filter(c => c.status === "active"),
    [contracts]
  );

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return <div className="p-8 text-center">Loading payment details…</div>;
  }

  /* ---------------- EMPTY STATE ---------------- */

  if (activeContracts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow text-center animate-fade-in">
        <ShieldCheck size={48} className="mx-auto text-emerald-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Pending Payments</h2>
        <p className="text-gray-600 mb-6">
          You currently have no active contracts that require payment.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="p-4 border rounded-lg">
            <FileText className="mx-auto mb-2 text-blue-500" />
            Payments are triggered only after contract activation.
          </div>
          <div className="p-4 border rounded-lg">
            <ShieldCheck className="mx-auto mb-2 text-emerald-500" />
            Funds are protected in escrow until delivery is confirmed.
          </div>
          <div className="p-4 border rounded-lg">
            <CheckCircle className="mx-auto mb-2 text-purple-500" />
            No action required from your side right now.
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">

      {activeContracts.map(contract => {
        const escrow = getEscrowForContract(contract._id);
        const payableAmount =
          Number(contract.quantity) * Number(contract.offerPrice);

        return (
          <div
            key={contract._id}
            className="bg-white rounded-2xl border shadow-sm p-6 animate-slide-up"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Package /> {contract.commodity}
              </h3>

              {!escrow ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                  Payment Due
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                  {escrow.status === "locked"
                    ? "Locked in Escrow"
                    : "Paid to Farmer"}
                </span>
              )}
            </div>

            {/* DETAILS */}
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Farmer</p>
                <p className="font-medium">{contract.farmerName}</p>
              </div>

              <div>
                <p className="text-gray-500">Quantity</p>
                <p className="font-medium">
                  {contract.quantity} {contract.unit}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  {escrow ? "Amount Paid" : "Amount Payable"}
                </p>
                <p className="font-bold text-lg">
                  ₹{payableAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* META */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
              {escrow?.depositedAt && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  Paid on{" "}
                  {new Date(escrow.depositedAt).toLocaleDateString("en-IN")}
                </span>
              )}

              <span className="flex items-center gap-1">
                <MapPin size={14} /> {contract.location}
              </span>

              <span className="flex items-center gap-1">
                <ShieldCheck size={14} /> Delivery Confirmation
              </span>
            </div>

            {/* ACTION */}
            {!escrow && (
              <div className="mt-6">
                <button
                  onClick={() =>
                    navigate(`/dashboard/buyer/payments/${contract._id}`)
                  }
                  className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-2"
                >
                  Pay Amount
                  <AlertCircle size={16} />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

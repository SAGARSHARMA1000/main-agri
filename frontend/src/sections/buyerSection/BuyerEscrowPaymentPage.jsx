// import React, { useEffect, useState } from "react";
// import {
//   ShieldCheck,
//   Lock,
//   CreditCard,
//   Smartphone,
//   Landmark,
//   ChevronRight,
//   AlertCircle,
//   CheckCircle,
//   History,
//   Wallet,
//   ArrowUpRight,
//   ArrowDownLeft
// } from "lucide-react";
// import api from "../../services/api";
// import { useOutletContext } from "react-router-dom";

// /* ---------------- MOCK STRUCTURE (UNCHANGED) ---------------- */

// const DEFAULT_WALLET = {
//   balance: 0,
//   lockedInEscrow: 0,
//   currency: "₹"
// };

// /* ---------------- COMPONENTS (UNCHANGED UI) ---------------- */

// const PaymentMethodTab = ({ icon: Icon, label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
//       active
//         ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
//         : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
//     }`}
//   >
//     <Icon size={24} className="mb-2" />
//     <span className="text-xs font-medium">{label}</span>
//   </button>
// );

// const TransactionRow = ({ txn }) => (
//   <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2">
//     <div className="flex items-center gap-3">
//       <div
//         className={`p-2 rounded-full ${
//           txn.type === "credit"
//             ? "bg-green-100 text-green-600"
//             : "bg-gray-100 text-gray-600"
//         }`}
//       >
//         {txn.type === "credit" ? (
//           <ArrowDownLeft size={18} />
//         ) : (
//           <ArrowUpRight size={18} />
//         )}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-800">{txn.desc}</p>
//         <p className="text-xs text-gray-400">
//           {txn.date} • {txn.id}
//         </p>
//       </div>
//     </div>
//     <div className="text-right">
//       <p
//         className={`text-sm font-bold ${
//           txn.type === "credit" ? "text-green-600" : "text-gray-800"
//         }`}
//       >
//         {txn.type === "credit" ? "+" : "-"} ₹{txn.amount.toLocaleString()}
//       </p>
//       <span
//         className={`text-xs px-2 py-0.5 rounded-full ${
//           txn.status === "Locked"
//             ? "bg-yellow-100 text-yellow-700"
//             : "bg-gray-100 text-gray-500"
//         }`}
//       >
//         {txn.status}
//       </span>
//     </div>
//   </div>
// );

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function EscrowPage() {
//   const [wallet, setWallet] = useState(DEFAULT_WALLET);
//   const [pendingPayments, setPendingPayments] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [activePayment, setActivePayment] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("upi");
//   const [paymentState, setPaymentState] = useState("idle");
//   const [showReceipt, setShowReceipt] = useState(false);
//   const { user } = useOutletContext();

//   /* ---------------- FETCH DASHBOARD DATA ---------------- */

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         //const buyerId = localStorage.getItem("userId");

//         const res = await api.getBuyerEscrowDashboard(user.id);
//         console.log("✅ Escrow Dashboard:", res.data);

//         /* Wallet */
//         setWallet({
//           balance: res.data.wallet.balance,
//           lockedInEscrow: res.data.wallet.lockedInEscrow,
//           currency: "₹"
//         });

//         /* Pending Payments */
//         const mappedPending = res.data.pendingPayments.map(p => ({
//           id: p._id,
//           contractId: p.contractId,
//           type: "Advance Payment (30%)",
//           crop: p.commodity,
//           farmer: p.farmerName,
//           amount: p.advanceAmount,
//           platformFee: p.platformFee,
//           gst: p.gst,
//           total: p.advanceAmount + p.platformFee + p.gst,
//           dueDate: "Immediate",
//           status: p.status === "pending" ? "Pending" : "Locked"
//         }));

//         setPendingPayments(mappedPending);
//         setActivePayment(mappedPending[0] || null);

//         /* Transactions */
//         const mappedTxns = res.data.transactions.map(txn => ({
//           id: txn._id,
//           date: new Date(txn.createdAt).toDateString(),
//           desc: txn.description,
//           amount: txn.amount,
//           type: txn.type,
//           status:
//             txn.status === "released"
//               ? "Success"
//               : txn.status === "locked"
//               ? "Locked"
//               : "Pending"
//         }));

//         setTransactions(mappedTxns);
//       } catch (err) {
//         console.error("❌ Failed to load escrow dashboard", err);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   /* ---------------- PAY SIMULATION (UNCHANGED UI) ---------------- */

//   const handlePay = async () => {
//     setPaymentState("processing");

//     setTimeout(() => {
//       setPaymentState("success");
//       setShowReceipt(true);
//     }, 2500);
//   };

//   /* ---------------- SUCCESS RECEIPT ---------------- */

//   const SuccessReceipt = () => (
//     <div className="animate-fade-in text-center p-8 bg-white rounded-xl shadow-lg border">
//       <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
//         <ShieldCheck size={40} className="text-emerald-600" />
//       </div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Payment Secured
//       </h2>
//       <p className="text-gray-600 mb-6">
//         ₹{activePayment.total.toLocaleString()} deposited into escrow.
//       </p>
//       <button
//         onClick={() => {
//           setPaymentState("idle");
//           setShowReceipt(false);
//           setActivePayment(null);
//         }}
//         className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium"
//       >
//         Return to Dashboard
//       </button>
//     </div>
//   );

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">

//       {/* HEADER */}
//       <header className="max-w-5xl mx-auto mb-8">
//         <div className="flex items-center gap-2 text-emerald-800 font-bold text-xl mb-6">
//           <Landmark />
//           <span>AgriPay Escrow</span>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="bg-gray-900 text-white p-6 rounded-2xl">
//             <p className="text-gray-400 text-sm flex items-center gap-2">
//               <Wallet size={16} /> Available Balance
//             </p>
//             <h2 className="text-3xl font-bold">
//               ₹{wallet.balance.toLocaleString()}
//             </h2>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border">
//             <p className="text-yellow-600 text-sm flex items-center gap-2">
//               <Lock size={16} /> Locked in Escrow
//             </p>
//             <h2 className="text-3xl font-bold">
//               ₹{wallet.lockedInEscrow.toLocaleString()}
//             </h2>
//           </div>

//           <div className="bg-blue-50 p-6 rounded-2xl border">
//             <ShieldCheck className="text-blue-600 mb-2" />
//             <p className="text-sm text-blue-700">
//               Funds secured until delivery confirmation.
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* MAIN */}
//       <main className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-8">
//           {activePayment ? (
//             <div className="bg-white rounded-2xl border p-6">
//               <h3 className="font-bold text-gray-800 mb-4">
//                 Payment Due
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {activePayment.contractId} • {activePayment.crop}
//               </p>
//               <p className="text-xl font-bold mt-2">
//                 ₹{activePayment.total.toLocaleString()}
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
//               <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
//               No pending payments
//             </div>
//           )}

//           <div className="bg-white rounded-2xl border p-6">
//             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <History size={20} /> Recent Transactions
//             </h3>
//             {transactions.map(txn => (
//               <TransactionRow key={txn.id} txn={txn} />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="lg:col-span-1">
//           {showReceipt ? (
//             <SuccessReceipt />
//           ) : activePayment ? (
//             <div className="bg-white rounded-2xl border p-6 sticky top-8">
//               <h3 className="font-bold mb-4">Select Payment Method</h3>
//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 <PaymentMethodTab icon={Smartphone} label="UPI" active={paymentMethod === "upi"} onClick={() => setPaymentMethod("upi")} />
//                 <PaymentMethodTab icon={CreditCard} label="Card" active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")} />
//                 <PaymentMethodTab icon={Landmark} label="NetBank" active={paymentMethod === "netbanking"} onClick={() => setPaymentMethod("netbanking")} />
//               </div>

//               <button
//                 onClick={handlePay}
//                 className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
//               >
//                 Pay ₹{activePayment.total.toLocaleString()}
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           ) : null}
//         </div>
//       </main>
//     </div>
//   );
//}
2
// import React, { useEffect, useState } from "react";
// import {
//   ShieldCheck,
//   Lock,
//   CreditCard,
//   Smartphone,
//   Landmark,
//   ChevronRight,
//   CheckCircle,
//   History,
//   Wallet,
//   ArrowUpRight,
//   ArrowDownLeft
// } from "lucide-react";
// import api from "../../services/api";
// import { useOutletContext } from "react-router-dom";

// /* ---------------- DEFAULT STRUCTURE ---------------- */

// const DEFAULT_WALLET = {
//   balance: 0,
//   lockedInEscrow: 0,
//   currency: "₹"
// };

// /* ---------------- UI COMPONENTS (UNCHANGED) ---------------- */

// const PaymentMethodTab = ({ icon: Icon, label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
//       active
//         ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
//         : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
//     }`}
//   >
//     <Icon size={24} className="mb-2" />
//     <span className="text-xs font-medium">{label}</span>
//   </button>
// );

// const TransactionRow = ({ txn }) => (
//   <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2">
//     <div className="flex items-center gap-3">
//       <div
//         className={`p-2 rounded-full ${
//           txn.type === "credit"
//             ? "bg-green-100 text-green-600"
//             : "bg-gray-100 text-gray-600"
//         }`}
//       >
//         {txn.type === "credit" ? (
//           <ArrowDownLeft size={18} />
//         ) : (
//           <ArrowUpRight size={18} />
//         )}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-800">{txn.desc}</p>
//         <p className="text-xs text-gray-400">
//           {txn.date} • {txn.id}
//         </p>
//       </div>
//     </div>
//     <div className="text-right">
//       <p
//         className={`text-sm font-bold ${
//           txn.type === "credit" ? "text-green-600" : "text-gray-800"
//         }`}
//       >
//         {txn.type === "credit" ? "+" : "-"} ₹{txn.amount.toLocaleString()}
//       </p>
//       <span
//         className={`text-xs px-2 py-0.5 rounded-full ${
//           txn.status === "Locked"
//             ? "bg-yellow-100 text-yellow-700"
//             : "bg-gray-100 text-gray-500"
//         }`}
//       >
//         {txn.status}
//       </span>
//     </div>
//   </div>
// );

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function EscrowPage() {
//   const { user } = useOutletContext();

//   const [wallet, setWallet] = useState(DEFAULT_WALLET);
//   const [pendingPayments, setPendingPayments] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [activePayment, setActivePayment] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("upi");
//   const [paymentState, setPaymentState] = useState("idle");
//   const [showReceipt, setShowReceipt] = useState(false);

//   /* ---------------- FETCH DASHBOARD ---------------- */

//   // useEffect(() => {
//   //   if (!user?.id) return;

//   //   const fetchDashboard = async () => {
//   //     try {
//   //       const res = await api.getBuyerEscrowDashboard(user.id);
//   //       console.log("✅ Escrow Dashboard:", res.data);

//   //       /* Wallet */
//   //       setWallet({
//   //         balance: res.data.wallet?.balance || 0,
//   //         lockedInEscrow: res.data.wallet?.lockedInEscrow || 0,
//   //         currency: "₹"
//   //       });

//   //       /* Pending Payments (SAFE MAPPING) */
//   //       const mappedPending = (res.data.pendingPayments || []).map(p => ({
//   //         //console.log("🧾 RAW PAYMENT:", p);
//   //         id: p._id,
//   //        // contractId: p.contractId,
//   //         crop: p.commodity,
//   //         farmer: p.farmerName,
//   //         amount: p.advanceAmount,
//   //         platformFee: p.platformFee,
//   //         gst: p.gst,
//   //         total: Number(p.advanceAmount) + Number(p.platformFee) + Number(p.gst),
//   //         dueDate: "Immediate",
//   //         status: p.status === "pending" ? "Pending" : "Locked"
//   //       }));

//   //       setPendingPayments(mappedPending);
//   //       setActivePayment(mappedPending[0] || null);

//   //       /* Transactions */
//   //       const mappedTxns = (res.data.transactions || []).map(txn => ({
//   //         id: txn._id,
//   //         date: new Date(txn.createdAt).toDateString(),
//   //         desc: txn.description,
//   //         amount: txn.amount,
//   //         type: txn.type,
//   //         status:
//   //           txn.status === "released"
//   //             ? "Success"
//   //             : txn.status === "locked"
//   //             ? "Locked"
//   //             : "Pending"
//   //       }));

//   //       setTransactions(mappedTxns);
//   //     } catch (err) {
//   //       console.error("❌ Failed to load escrow dashboard", err);
//   //     }
//   //   };

//   //   fetchDashboard();
//   // }, [user]);

//   useEffect(() => {
//   if (!user?.id) return;

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.getBuyerEscrowDashboard(user.id);
//       console.log("✅ Escrow Dashboard:", res.data);

//       setWallet({
//         balance: res.data.wallet?.balance || 0,
//         lockedInEscrow: res.data.wallet?.lockedInEscrow || 0,
//         currency: "₹"
//       });

//       const mappedPending = (res.data.pendingPayments || []).map(p => {
//         console.log("🧾 RAW PAYMENT:", p);
//         const contract = p.contract || {};
//         const advance = Number(p.amount || 0);
//        // const fee = Number(p.platformFee || 0);
//         //const gst = Number(p.gst || 0);
//         return {
//           id: p._id,
//           contractId: p.contractId?._id || "",
//           crop: contract.commodity || "",
//           farmer: contract.farmerName || "",
//           amount: advance,
//           //platformFee: fee,
//           //gst: gst,
//           total:advance ,
//           dueDate: "Immediate",
//           status: p.status === "pending" ? "Pending" : "Locked"
//         };
//       });

//       console.log("🧩 MAPPED PAYMENTS:", mappedPending);

//       setPendingPayments(mappedPending);
//       setActivePayment(mappedPending[0] || null);

//     } catch (err) {
//       console.error("❌ Escrow dashboard load failed", err);
//     }
//   };

//   fetchDashboard();
// }, [user?.id]);

//   /* ---------------- PAYMENT SIMULATION ---------------- */

//   const handlePay = () => {
//     setPaymentState("processing");

//     setTimeout(() => {
//       setPaymentState("success");
//       setShowReceipt(true);
//     }, 2500);
//   };

//   /* ---------------- SUCCESS RECEIPT ---------------- */

//   const SuccessReceipt = () => (
//     <div className="animate-fade-in text-center p-8 bg-white rounded-xl shadow-lg border">
//       <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
//         <ShieldCheck size={40} className="text-emerald-600" />
//       </div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Payment Secured
//       </h2>
//       <p className="text-gray-600 mb-6">
//         ₹{activePayment?.total?.toLocaleString()} deposited into escrow.
//       </p>
//       <button
//         onClick={() => {
//           setPaymentState("idle");
//           setShowReceipt(false);
//           setActivePayment(null);
//         }}
//         className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium"
//       >
//         Return to Dashboard
//       </button>
//     </div>
//   );

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">

//       {/* HEADER */}
//       <header className="max-w-5xl mx-auto mb-8">
//         <div className="flex items-center gap-2 text-emerald-800 font-bold text-xl mb-6">
//           <Landmark />
//           <span>AgriPay Escrow</span>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="bg-gray-900 text-white p-6 rounded-2xl">
//             <p className="text-gray-400 text-sm flex items-center gap-2">
//               <Wallet size={16} /> Available Balance
//             </p>
//             <h2 className="text-3xl font-bold">
//               ₹{wallet.balance.toLocaleString()}
//             </h2>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border">
//             <p className="text-yellow-600 text-sm flex items-center gap-2">
//               <Lock size={16} /> Locked in Escrow
//             </p>
//             <h2 className="text-3xl font-bold">
//               ₹{wallet.lockedInEscrow.toLocaleString()}
//             </h2>
//           </div>

//           <div className="bg-blue-50 p-6 rounded-2xl border">
//             <ShieldCheck className="text-blue-600 mb-2" />
//             <p className="text-sm text-blue-700">
//               Funds secured until delivery confirmation.
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* MAIN */}
//       <main className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-8">
//           {activePayment ? (
//             <div className="bg-white rounded-2xl border p-6">
//               <h3 className="font-bold text-gray-800 mb-4">
//                 Payment Due
//               </h3>
//               <p className="text-sm text-gray-600">
//               bbbb
//                 {activePayment.crop}
//               </p>
//               <p className="text-xl font-bold mt-2">
//                 ₹{activePayment.total.toLocaleString()}
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
//               <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
//               No pending payments
//             </div>
//           )}

//           <div className="bg-white rounded-2xl border p-6">
//             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <History size={20} /> Recent Transactions
//             </h3>
//             {transactions.map(txn => (
//               <TransactionRow key={txn.id} txn={txn} />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="lg:col-span-1">
//           {showReceipt ? (
//             <SuccessReceipt />
//           ) : activePayment ? (
//             <div className="bg-white rounded-2xl border p-6 sticky top-8">
//               <h3 className="font-bold mb-4">Select Payment Method</h3>

//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 <PaymentMethodTab icon={Smartphone} label="UPI" active={paymentMethod === "upi"} onClick={() => setPaymentMethod("upi")} />
//                 <PaymentMethodTab icon={CreditCard} label="Card" active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")} />
//                 <PaymentMethodTab icon={Landmark} label="NetBank" active={paymentMethod === "netbanking"} onClick={() => setPaymentMethod("netbanking")} />
//               </div>

//               <button
//                 onClick={handlePay}
//                 className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
//               >
//                 Pay ₹{activePayment.total.toLocaleString()}
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           ) : null}
//         </div>
//       </main>
//     </div>
//   );
// }
//fin
// import React, { useEffect, useState } from "react";
// import {
//   ShieldCheck,
//   Lock,
//   CreditCard,
//   Smartphone,
//   Landmark,
//   ChevronRight,
//   CheckCircle,
//   History,
//   Wallet,
//   ArrowUpRight,
//   ArrowDownLeft,
//   AlertCircle
// } from "lucide-react";
// import api from "../../services/api";
// import { useOutletContext } from "react-router-dom";
// import { useParams } from "react-router-dom";

// /* ---------------- DEFAULT STRUCTURE ---------------- */

// const DEFAULT_WALLET = {
//   balance: 1000000,
//   lockedInEscrow: 0,
//   currency: "₹"
// };

// /* ---------------- UI COMPONENTS (UNCHANGED) ---------------- */

// const PaymentMethodTab = ({ icon: Icon, label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
//       active
//         ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
//         : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
//     }`}
//   >
//     <Icon size={24} className="mb-2" />
//     <span className="text-xs font-medium">{label}</span>
//   </button>
// );

// const TransactionRow = ({ txn }) => (
//   <div className="flex justify-between items-center py-4 border-b border-gray-50">
//     <div className="flex items-center gap-3">
//       <div className={`p-2 rounded-full ${txn.type === "credit" ? "bg-green-100" : "bg-gray-100"}`}>
//         {txn.type === "credit" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
//       </div>
//       <div>
//         <p className="text-sm font-medium">{txn.desc}</p>
//         <p className="text-xs text-gray-400">{txn.date}</p>
//       </div>
//     </div>
//     <p className="font-bold">₹{txn.amount.toLocaleString()}</p>
//   </div>
// );

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function EscrowPage() {
//   const { user } = useOutletContext();
//   const { contractId } = useParams();


//   const [wallet, setWallet] = useState(DEFAULT_WALLET);
//   const [pendingPayments, setPendingPayments] = useState([]);
//   const [activePayment, setActivePayment] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("upi");
//   const [paymentState, setPaymentState] = useState("idle");
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [showDueWarning, setShowDueWarning] = useState(false);

//   /* ---------------- FETCH DASHBOARD (BACKEND SOURCE OF TRUTH) ---------------- */



// useEffect(() => {
//   if (!user?.id || !contractId) return;

//   const fetchContractDetails = async () => {
//     try {
//       // 1️⃣ Fetch contract ONLY
//       const res = await api.getContractById(contractId);
//       const contract = res.data.contract;

//  //before payment

//      setWallet({
//   balance: wallet.balance || 0,
//   lockedInEscrow: wallet.lockedInEscrow || 0,
//   currency: "₹"
// });

//       // 3️⃣ Build payment due FROM CONTRACT
//       const totalAmount =
//         Number(contract.quantity) * Number(contract.offerPrice);

//       setActivePayment({
//         contractId: contract._id,
//         crop: contract.commodity,
//         buyerId:contract.buyerId,
//         buyerName:contract.buyerName,
//         farmerId:contract.farmerId,
//         farmerName: contract.farmerName,
//         amount: totalAmount,
//         total: totalAmount,
//         contractDate: contract.createdAt
//       });

//       // 4️⃣ 15-day rule from contract creation date
//       const dueDate = new Date(contract.createdAt);
//       dueDate.setDate(dueDate.getDate() + 15);

//       setShowDueWarning(new Date() < dueDate);

//     } catch (err) {
//       console.error("❌ Failed to load contract", err);
//       setActivePayment(null);
//     }
//   };

//   fetchContractDetails();
// }, [user?.id, contractId]);


//   /* ---------------- PAY HANDLER (REAL WORLD UPI ANIMATION) ---------------- */

  
//   const handlePay = async () => {
//   if (!activePayment || !user?.id) return;

//   try {
//     setPaymentState("processing");

//     const payload = {
//       contractId: activePayment.contractId,
//       buyerId: activePayment.buyerId,
//       buyerName: activePayment.buyerName,
//       farmerId: activePayment.farmerId,
//       farmerName: activePayment.farmerName,
//       amount: activePayment.total,
//       releaseCondition: "Delivery Confirmation"
//     };

//     const res = await api.depositEscrow(payload);

//     console.log("✅ Escrow Created:", res.data);

//     // Optional: store escrow id if needed later
//     setActivePayment(prev => ({
//       ...prev,
//       escrowId: res.data.escrow._id,
//       status: "Pending"
//     }));

//     setPaymentState("success");
//     // setTimeout(() => {
//     //   setPaymentState("success");
//     //   setShowReceipt(true);
//     // }, 2200);

//   } catch (err) {
//     console.error("❌ Failed to create escrow", err);
//     setPaymentState("idle");
//     alert("Payment initiation failed. Try again.");
//   }
// };


//   /* ---------------- SUCCESS RECEIPT ---------------- */

//   const SuccessReceipt = () => (
//     <div className="text-center p-8 bg-white rounded-xl shadow border">
//       <ShieldCheck size={40} className="mx-auto text-emerald-600 mb-4" />
//       <h2 className="text-xl font-bold">Payment Secured</h2>
//       <p className="text-gray-600">
//         ₹{activePayment.total.toLocaleString()} locked in escrow
//       </p>
//     </div>
//   );

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">

//       {/* HEADER */}
//       <header className="max-w-5xl mx-auto mb-8 grid md:grid-cols-3 gap-6">
//         <div className="bg-gray-900 text-white p-6 rounded-2xl">
//           <p className="text-sm flex gap-2"><Wallet size={16}/> Available Balance</p>
//           <h2 className="text-3xl font-bold">₹{wallet.balance.toLocaleString()}</h2>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border">
//           <p className="text-yellow-600 text-sm flex gap-2"><Lock size={16}/> Locked in Escrow</p>
//           <h2 className="text-3xl font-bold">₹{wallet.lockedInEscrow.toLocaleString()}</h2>
//         </div>

//         <div className="bg-blue-50 p-6 rounded-2xl border">
//           <ShieldCheck className="text-blue-600 mb-2" />
//           Funds secured until delivery confirmation.
//         </div>
//       </header>

//       {/* MAIN */}
//       <main className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         <div className="lg:col-span-2">
//           {activePayment ? (
//             <div className="bg-white p-6 rounded-2xl border">
//               <h3 className="font-bold mb-2">Payment Due</h3>
//               <p className="text-xl font-bold">₹{activePayment.total.toLocaleString()}</p>
//               <p className="text-xl font-bold">{activePayment.farmerId}</p>

//               {showDueWarning && (
//                 <div className="mt-4 flex gap-2 text-sm text-orange-700 bg-orange-50 p-3 rounded animate-pulse">
//                   <AlertCircle size={16} />
//                   Payment must be completed within 15 days of contract date
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
//               <CheckCircle size={48} className="mx-auto mb-4" />
//               No pending payments
//             </div>
//           )}
//         </div>

//         {/* RIGHT */}
//         <div>
//           {showReceipt ? (
//             <SuccessReceipt />
//           ) : activePayment ? (
//             <div className="bg-white p-6 rounded-2xl border sticky top-8">

//               <button
//                 onClick={handlePay}
//                 className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex justify-center gap-2 mb-6"
//               >
//                 {paymentState === "processing" ? "Processing via UPI..." : `Pay ₹${activePayment.total.toLocaleString()}`}
//                 <ChevronRight />
//               </button>

//               {/* PAYMENT METHOD (MOVED BELOW BUTTON) */}
//               <div className="grid grid-cols-3 gap-3">
//                 <PaymentMethodTab icon={Smartphone} label="UPI" active={paymentMethod === "upi"} onClick={() => setPaymentMethod("upi")} />
//                 <PaymentMethodTab icon={CreditCard} label="Card" active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")} />
//                 <PaymentMethodTab icon={Landmark} label="NetBank" active={paymentMethod === "netbanking"} onClick={() => setPaymentMethod("netbanking")} />
//               </div>

//             </div>
//           ) : null}
//         </div>
//       </main>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Landmark,
  ChevronRight,
  CheckCircle,
  History,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  AlertCircle
} from "lucide-react";
import api from "../../services/api";
import { useOutletContext, useParams } from "react-router-dom";

/* ---------------- DEFAULT STRUCTURE ---------------- */

const DEFAULT_WALLET = {
  balance: 1000000,
  lockedInEscrow: 0,
  currency: "₹"
};

/* ---------------- UI COMPONENTS (UNCHANGED) ---------------- */

const PaymentMethodTab = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
      active
        ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
    }`}
  >
    <Icon size={24} className="mb-2" />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

/* ---------------- MAIN COMPONENT ---------------- */

export default function BuyerEscrowPaymentPage() {
  const { user } = useOutletContext();
  const { contractId } = useParams();

  const [wallet, setWallet] = useState(DEFAULT_WALLET);
  const [activePayment, setActivePayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentState, setPaymentState] = useState("idle");
  const [showDueWarning, setShowDueWarning] = useState(false);

  const [showBalance, setShowBalance] = useState(false);

  /* ---------------- AUTO HIDE BALANCE ---------------- */

  useEffect(() => {
    if (!showBalance) return;
    const t = setTimeout(() => setShowBalance(false), 5000);
    return () => clearTimeout(t);
  }, [showBalance]);

  /* ---------------- FETCH CONTRACT (NO ESCROW YET) ---------------- */

  useEffect(() => {
    if (!user?.id || !contractId) return;

    const fetchContract = async () => {
      try {
        const res = await api.getContractById(contractId);
        const contract = res.data.contract;

        const total =
          Number(contract.quantity) * Number(contract.offerPrice);

        setActivePayment({
          contractId: contract._id,
          crop:contract.commodity,
          quantity:contract.quantity,
          buyerId: contract.buyerId,
          buyerName: contract.buyerName,
          farmerId: contract.farmerId,
          farmerName: contract.farmerName,
          total,
          contractDate: contract.createdAt,
          pickupAddress:contract.farmAddress,
          deliveryAddress:contract.deliveryAddress,
        });

        const due = new Date(contract.createdAt);
        due.setDate(due.getDate() + 15);
        setShowDueWarning(new Date() < due);
      } catch (e) {
        setActivePayment(null);
      }
    };

    fetchContract();
  }, [user?.id, contractId]);

  /* ---------------- PAY HANDLER ---------------- */

  const handlePay = async () => {
    if (!activePayment) return;

    try {
      setPaymentState("processing");

      const res = await api.depositEscrow({
        contractId: activePayment.contractId,
        buyerId: activePayment.buyerId,
        buyerName: activePayment.buyerName,
        farmerId: activePayment.farmerId,
        farmerName: activePayment.farmerName,
        amount: activePayment.total,
        pickupAddress:activePayment.pickupAddress,
        deliveryAddress:activePayment.deliveryAddress,
        releaseCondition: "Delivery Confirmation"
      });

      // ✅ UPDATE WALLET UI
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - activePayment.total,
        lockedInEscrow: prev.lockedInEscrow + activePayment.total
      }));

      // ✅ REMOVE PAYMENT DUE
      setActivePayment(null);

      setPaymentState("success");
    } catch (err) {
      console.error("Payment failed", err);
      setPaymentState("idle");
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <header className="max-w-5xl mx-auto mb-8 grid md:grid-cols-3 gap-6">

        <div className="bg-gray-900 text-white p-6 rounded-2xl">
          <p className="text-sm flex gap-2">
            <Wallet size={16}/> Available Balance
          </p>

          <h2 className="text-3xl font-bold">
            {showBalance
              ? `₹${wallet.balance.toLocaleString()}`
              : "₹1*****"}
          </h2>

          {!showBalance && (
            <button
              onClick={() => setShowBalance(true)}
              className="text-xs underline text-gray-300 mt-1"
            >
              Show balance
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-yellow-600 text-sm flex gap-2">
            <Lock size={16}/> Locked in Escrow
          </p>
          <h2 className="text-3xl font-bold">
            ₹{wallet.lockedInEscrow.toLocaleString()}
          </h2>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border">
          <ShieldCheck className="text-blue-600 mb-2" />
          Funds secured until delivery confirmation.
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">
          {activePayment ? (
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-bold mb-2">Payment Due</h3>
              <p className="text-xl font-bold">
                ₹{activePayment.total.toLocaleString()}
              </p>

              {showDueWarning && (
                <div className="mt-4 flex gap-2 text-sm text-orange-700 bg-orange-50 p-3 rounded animate-pulse">
                  <AlertCircle size={16} />
                  Payment must be completed within 15 days
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
              <CheckCircle size={48} className="mx-auto mb-4" />
              No pending payments
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div>
          {activePayment && (
            <div className="bg-white p-6 rounded-2xl border sticky top-8">

              <button
                onClick={handlePay}
                disabled={paymentState === "processing"}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex justify-center gap-2 mb-6"
              >
                {paymentState === "processing"
                  ? "Processing via UPI..."
                  : `Pay ₹${activePayment.total.toLocaleString()}`}
                <ChevronRight />
              </button>

              <div className="grid grid-cols-3 gap-3">
                <PaymentMethodTab icon={Smartphone} label="UPI" active={paymentMethod === "upi"} onClick={() => setPaymentMethod("upi")} />
                <PaymentMethodTab icon={CreditCard} label="Card" active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")} />
                <PaymentMethodTab icon={Landmark} label="NetBank" active={paymentMethod === "netbanking"} onClick={() => setPaymentMethod("netbanking")} />
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}

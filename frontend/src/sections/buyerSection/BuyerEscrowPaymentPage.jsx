
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
// import { useOutletContext, useParams } from "react-router-dom";

// /* ---------------- DEFAULT STRUCTURE ---------------- */

// const DEFAULT_WALLET = {
//   balance: 1000000,
//   lockedInEscrow: 0,
//   currency: "₹"
// };
// const TRANSACTIONS = [
//   { id: "TXN-7741", date: "Aug 01, 2024", desc: "Escrow Release - Wheat Contract", amount: 45000, type: "debit", status: "Success" },
//   { id: "TXN-7702", date: "Jul 28, 2024", desc: "Wallet Top-up", amount: 100000, type: "credit", status: "Success" },
//   { id: "TXN-7699", date: "Jul 20, 2024", desc: "Escrow Deposit - Corn Contract", amount: 10000, type: "debit", status: "Locked" },
// ];

// const TransactionRow = ({ txn }) => (
//   <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 transition-colors">
//     <div className="flex items-center gap-3">
//       <div className={`p-2 rounded-full ${txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
//         {txn.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-800">{txn.desc}</p>
//         <p className="text-xs text-gray-400">{txn.date} • {txn.id}</p>
//       </div>
//     </div>
//     <div className="text-right">
//       <p className={`text-sm font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
//         {txn.type === 'credit' ? '+' : '-'} ₹{txn.amount.toLocaleString()}
//       </p>
//       <span className={`text-xs px-2 py-0.5 rounded-full ${
//         txn.status === 'Locked' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
//       }`}>
//         {txn.status}
//       </span>
//     </div>
//   </div>
// );

// // --- Main
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

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function BuyerEscrowPaymentPage() {
//   const { user } = useOutletContext();
//   const { contractId } = useParams();

//   const [wallet, setWallet] = useState(DEFAULT_WALLET);
//   const [activePayment, setActivePayment] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("upi");
//   const [paymentState, setPaymentState] = useState("idle");
//   const [showDueWarning, setShowDueWarning] = useState(false);

//   const [showBalance, setShowBalance] = useState(false);
//   const platformFee=499;
//   /* ---------------- AUTO HIDE BALANCE ---------------- */

//   useEffect(() => {
//     if (!showBalance) return;
//     const t = setTimeout(() => setShowBalance(false), 5000);
//     return () => clearTimeout(t);
//   }, [showBalance]);

//   /* ---------------- FETCH CONTRACT (NO ESCROW YET) ---------------- */

//   useEffect(() => {
//     if (!user?.id || !contractId) return;

//     const fetchContract = async () => {
//       try {
//         const res = await api.getContractById(contractId);
//         const contract = res.data.contract;
//       //  const platformFee= 499;
//       //  const farmerName=contract.farmerName;
//       const cropprice =Number((contract.quantity) * Number(contract.offerPrice));
//         const total =
//           Number((contract.quantity) * Number(contract.offerPrice))+platformFee;

//         setActivePayment({
//           contractId: contract._id,
//           crop:contract.commodity,
//           quantity:contract.quantity,
//           buyerId: contract.buyerId,
//           buyerName: contract.buyerName,
//           farmerId: contract.farmerId,
//           farmerName: contract.farmerName,
//           total,
//           contractDate: contract.createdAt,
//           pickupAddress:contract.farmAddress,
//           deliveryAddress:contract.deliveryAddress,
//         });

//         const due = new Date(contract.createdAt);
//         due.setDate(due.getDate() + 15);
//         setShowDueWarning(new Date() < due);
//       } catch (e) {
//         setActivePayment(null);
//       }
//     };

//     fetchContract();
//   }, [user?.id, contractId]);

//   /* ---------------- PAY HANDLER ---------------- */

//   const handlePay = async () => {
//     if (!activePayment) return;

//     try {
//       setPaymentState("processing");

//       const res = await api.depositEscrow({
//         contractId: activePayment.contractId,
//         buyerId: activePayment.buyerId,
//         buyerName: activePayment.buyerName,
//         farmerId: activePayment.farmerId,
//         farmerName: activePayment.farmerName,
//         crop:activePayment.crop,
//         quantity:activePayment.quantity,
//         amount: activePayment.total,
//         pickupAddress:activePayment.pickupAddress,
//         deliveryAddress:activePayment.deliveryAddress,
//         releaseCondition: "Delivery Confirmation"
//       });

//       // ✅ UPDATE WALLET UI
//       setWallet(prev => ({
//         ...prev,
//         balance: prev.balance - activePayment.total,
//         lockedInEscrow: prev.lockedInEscrow + activePayment.total
//       }));

//       // ✅ REMOVE PAYMENT DUE
//       setActivePayment(null);

//       setPaymentState("success");
//     } catch (err) {
//       console.error("Payment failed", err);
//       setPaymentState("idle");
//     }
//   };

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">

//       {/* HEADER */}
//       <header className="max-w-5xl mx-auto mb-8 grid md:grid-cols-3 gap-6">

//         <div className="bg-gray-900 text-white p-6 rounded-2xl">
//           <p className="text-sm flex gap-2">
//             <Wallet size={16}/> Available Balance
//           </p>

//           <h2 className="text-3xl font-bold">
//             {showBalance
//               ? `₹${wallet.balance.toLocaleString()}`
//               : "₹1*****"}
//           </h2>

//           {!showBalance && (
//             <button
//               onClick={() => setShowBalance(true)}
//               className="text-xs underline text-gray-300 mt-1"
//             >
//               Show balance
//             </button>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-2xl border">
//           <p className="text-yellow-600 text-sm flex gap-2">
//             <Lock size={16}/> Locked in Escrow
//           </p>
//           <h2 className="text-3xl font-bold">
//             ₹{wallet.lockedInEscrow.toLocaleString()}
//           </h2>
//            <p className="text-xs text-gray-400">Releases upon delivery confirmation</p>
//           </div>
  

//         {/* <div className="bg-blue-50 p-6 rounded-2xl border-blue-100 flex flex-col justify-center items-start">
//           <ShieldCheck className="text-blue-600 mb-2" />
//           Funds secured until delivery confirmation.
//         </div> */}
        
//           <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center items-start">
//              <div className="flex items-center gap-2 mb-2">
//                <ShieldCheck className="text-blue-600" size={24} />
//                <span className="font-bold text-blue-800">Bank Grade Security</span>
//              </div>
//              <p className="text-sm text-blue-700">
//                Your funds are held in an RBI-regulated nodal account until contract terms are met.
//              </p>
//           </div>
//       </header>

//       {/* MAIN */}
//       <main className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         {/* <div className="lg:col-span-2 space-y-8">
//           {activePayment ? (
//             <div className="bg-white p-6 rounded-2xl border">
//               <h3 className="font-bold mb-2">Payment Due</h3>
//               <p className="text-xl font-bold">
//                 ₹{activePayment.total.toLocaleString()}
//               </p>

//               {showDueWarning && (
//                 <div className="mt-4 flex gap-2 text-sm text-orange-700 bg-orange-50 p-3 rounded animate-pulse">
//                   <AlertCircle size={16} />
//                   Payment must be completed within 15 days
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
//               <CheckCircle size={48} className="mx-auto mb-4" />
//               No pending payments
//             </div>
//           )}
//         </div> */}
//          <div className="lg:col-span-2 space-y-8">
          
//           {/* Active Payment Request */}
//           {activePayment ? (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex justify-between items-center">
//                 <div className="flex items-center gap-2 text-emerald-800 font-bold">
//                   <AlertCircle size={20} />
//                   Payment Due
//                 </div>
//                 <span className="bg-white text-emerald-700 text-xs font-bold px-2 py-1 rounded">
//                   {/* {activePayment.dueDate} */}
//                 </span>
//               </div>
              
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-6">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">CTR-{activePayment.contractId} - {activePayment.crop}</h3>
//                     <p className="text-sm text-gray-500">Beneficiary: {activePayment.farmerName}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500 uppercase font-bold">Payable Amount</p>
//                     <p className="text-2xl font-bold text-gray-900">₹{activePayment.total.toLocaleString()}</p>
//                   </div>
//                 </div>

//                 {/* Breakdown */}
//                 <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-6 text-sm border border-gray-100">
//                    <div className="flex justify-between">
//                      <span className="text-gray-600">Total Crop Price</span>
//                      <span className="font-medium">₹{(activePayment.total-platformFee).toLocaleString()}</span>
//                    </div>
//                    <div className="flex justify-between">
//                      <span className="text-gray-600">Agriassure Platform Fee</span>
//                      <span className="font-medium">₹{platformFee}</span>
//                    </div>
//                    <div className="flex justify-between">
//                      <span className="text-gray-600">GST (18% on Fee)</span>
//                      {/* <span className="font-medium">₹{activePayment.gst}</span> */}
//                      <span className="font-medium">₹0</span>
//                    </div>
//                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-800 mt-2">
//                      <span>Total</span>
//                      <span>₹{activePayment.total.toLocaleString()}</span>
//                    </div>
//                 </div>
//               </div>
//             {/* </div> */}
//             {showDueWarning && (
//                 <div className=" flex gap-2 text-sm text-orange-700 bg-orange-50 p-3 rounded animate-pulse">
//                   <AlertCircle size={16} />
//                   Payment must be completed within 15 days
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
//               <CheckCircle size={48} className="mx-auto mb-4" />
//               No pending payments
//             </div>
//           )}
          
//         {/* Transaction History */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                <History size={20} className="text-gray-400"/> Recent Transactions
//              </h3>
//              <div>
//                {TRANSACTIONS.map(txn => <TransactionRow key={txn.id} txn={txn} />)}
//              </div>
//              <button className="w-full text-center text-sm text-emerald-600 font-medium mt-4 hover:underline">
//                View All Transactions
//              </button>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="lg:col-span-1">
//           {activePayment && (
//             <div className="bg-white p-6 rounded-2xl border sticky top-8">

        

//               {/* <div className="grid grid-cols-3 gap-3">
//                 <PaymentMethodTab icon={Smartphone} label="UPI" active={paymentMethod === "upi"} onClick={() => setPaymentMethod("upi")} />
//                 <PaymentMethodTab icon={CreditCard} label="Card" active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")} />
//                 <PaymentMethodTab icon={Landmark} label="NetBank" active={paymentMethod === "netbanking"} onClick={() => setPaymentMethod("netbanking")} />
//               </div> */}
//                 <div className="p-6 space-y-6">
//                 {/* Method Selector */}
//                 <div className="grid grid-cols-3 gap-3">
//                   <PaymentMethodTab 
//                     icon={Smartphone} label="UPI" 
//                     active={paymentMethod === 'upi'} onClick={() => setPaymentMethod('upi')} 
//                   />
//                   <PaymentMethodTab 
//                     icon={CreditCard} label="Card" 
//                     active={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} 
//                   />
//                   <PaymentMethodTab 
//                     icon={Landmark} label="NetBank" 
//                     active={paymentMethod === 'netbanking'} onClick={() => setPaymentMethod('netbanking')} 
//                   />
//                 </div>

//                 {/* Dynamic Inputs based on Method */}
//                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[120px]">
//                   {paymentMethod === 'upi' && (
//                     <div className="space-y-3">
//                        <label className="text-xs font-bold text-gray-700 uppercase">Enter UPI ID</label>
//                        <div className="flex gap-2">
//                          <input 
//                             type="text" 
//                             placeholder="username@bank" 
//                             className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
//                             defaultValue="buyer@okhdfc"
//                          />
//                          <button className="bg-emerald-100 text-emerald-700 px-3 py-2 rounded text-sm font-medium">Verify</button>
//                        </div>
//                        <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
//                     </div>
//                   )}
//                   {paymentMethod === 'card' && (
//                      <div className="space-y-3">
//                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
//                        <div className="grid grid-cols-2 gap-3">
//                           <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
//                           <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
//                        </div>
//                        <p className="text-xs text-center text-gray-500">Card simulation mode active</p>
//                      </div>
//                   )}
//                   {paymentMethod === 'netbanking' && (
//                     <div className="space-y-2">
//                       <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
//                         <option>HDFC Bank</option>
//                         <option>State Bank of India</option>
//                         <option>ICICI Bank</option>
//                         <option>Axis Bank</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//                       {/* <button
//                 onClick={handlePay}
//                 disabled={paymentState === "processing"}
//                 className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 flex justify-center gap-2 mb-6"
//               >
//                 {paymentState === "processing"
//                   ? "Processing via UPI..."
//                   : `Pay ₹${activePayment.total.toLocaleString()}`}
//                 <ChevronRight />
//               </button> */}

//                 {/* Pay Button */}
//                 <button 
//                   onClick={handlePay}
//                   disabled={paymentState === 'processing'}
//                   className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
//                 >
//                   {paymentState === 'processing' ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       Pay ₹{activePayment.total.toLocaleString()}
//                       <ChevronRight size={20} />
//                     </>
//                   )}
//                 </button>
                
//                 <div className="flex justify-center gap-4 opacity-50 grayscale">
//                    {/* Placeholder Logos */}
//                    <div className="h-4 w-12 bg-gray-400 rounded"></div>
//                    <div className="h-4 w-12 bg-gray-400 rounded"></div>
//                    <div className="h-4 w-12 bg-gray-400 rounded"></div>
//                 </div>

//               </div>

//             </div>
//           )}
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

const TRANSACTIONS = [
  { id: "TXN-7741", date: "Aug 01, 2024", desc: "Escrow Release - Wheat Contract", amount: 45000, type: "debit", status: "Success" },
  { id: "TXN-7702", date: "Jul 28, 2024", desc: "Wallet Top-up", amount: 100000, type: "credit", status: "Success" },
  { id: "TXN-7699", date: "Jul 20, 2024", desc: "Escrow Deposit - Corn Contract", amount: 10000, type: "debit", status: "Locked" },
];

/* ---------------- RESPONSIVE TRANSACTION ROW ---------------- */

const TransactionRow = ({ txn }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 transition-colors">
    
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
        {txn.type === 'credit'
          ? <ArrowDownLeft size={16} />
          : <ArrowUpRight size={16} />}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-800 wrap-break-word">
          {txn.desc}
        </p>
        <p className="text-xs text-gray-400 break-all">
          {txn.date} • {txn.id}
        </p>
      </div>
    </div>

    <div className="text-left sm:text-right">
      <p className={`text-sm font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
        {txn.type === 'credit' ? '+' : '-'} ₹{txn.amount.toLocaleString()}
      </p>
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        txn.status === 'Locked'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-gray-100 text-gray-500'
      }`}>
        {txn.status}
      </span>
    </div>
  </div>
);

/* ---------------- PAYMENT METHOD TAB ---------------- */

const PaymentMethodTab = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-xs sm:text-sm ${
      active
        ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
    }`}
  >
    <Icon size={20} className="mb-1 sm:mb-2" />
    {label}
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

  const platformFee = 499;

  /* AUTO HIDE BALANCE */
  useEffect(() => {
    if (!showBalance) return;
    const t = setTimeout(() => setShowBalance(false), 5000);
    return () => clearTimeout(t);
  }, [showBalance]);

  /* FETCH CONTRACT */
  useEffect(() => {
    if (!user?.id || !contractId) return;

    const fetchContract = async () => {
      try {
        const res = await api.getContractById(contractId);
        const contract = res.data.contract;

        const total =
          Number(contract.quantity) * Number(contract.offerPrice) +
          platformFee;

        setActivePayment({
          contractId: contract._id,
          crop: contract.commodity,
          quantity: contract.quantity,
          buyerId: contract.buyerId,
          buyerName: contract.buyerName,
          farmerId: contract.farmerId,
          farmerName: contract.farmerName,
          total,
          contractDate: contract.createdAt,
          pickupAddress: contract.farmAddress,
          deliveryAddress: contract.deliveryAddress,
        });

        const due = new Date(contract.createdAt);
        due.setDate(due.getDate() + 15);
        setShowDueWarning(new Date() < due);
      } catch {
        setActivePayment(null);
      }
    };

    fetchContract();
  }, [user?.id, contractId]);

  const handlePay = async () => {
    if (!activePayment) return;

    try {
      setPaymentState("processing");

      await api.depositEscrow({
        contractId: activePayment.contractId,
        buyerId: activePayment.buyerId,
        buyerName: activePayment.buyerName,
        farmerId: activePayment.farmerId,
        farmerName: activePayment.farmerName,
        crop: activePayment.crop,
        quantity: activePayment.quantity,
        amount: activePayment.total,
        pickupAddress: activePayment.pickupAddress,
        deliveryAddress: activePayment.deliveryAddress,
        releaseCondition: "Delivery Confirmation"
      });

      setWallet(prev => ({
        ...prev,
        balance: prev.balance - activePayment.total,
        lockedInEscrow: prev.lockedInEscrow + activePayment.total
      }));

      setActivePayment(null);
      setPaymentState("success");

    } catch {
      setPaymentState("idle");
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* HEADER */}
      <header className="max-w-5xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        <div className="bg-gray-900 text-white p-5 sm:p-6 rounded-2xl">
          <p className="text-xs sm:text-sm flex gap-2">
            <Wallet size={16}/> Available Balance
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold">
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

        <div className="bg-white p-5 sm:p-6 rounded-2xl border">
          <p className="text-yellow-600 text-xs sm:text-sm flex gap-2">
            <Lock size={16}/> Locked in Escrow
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            ₹{wallet.lockedInEscrow.toLocaleString()}
          </h2>
          <p className="text-xs text-gray-400">
            Releases upon delivery confirmation
          </p>
        </div>

        <div className="bg-blue-50 p-5 sm:p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-blue-600" size={22} />
            <span className="font-bold text-blue-800 text-sm sm:text-base">
              Bank Grade Security
            </span>
          </div>
          <p className="text-xs sm:text-sm text-blue-700">
            Funds are held in an RBI-regulated nodal account until contract terms are met.
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">

          {/* PAYMENT DUE */}
          {activePayment ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold wrap-break-word">
                    CTR-{activePayment.contractId} - {activePayment.crop}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Beneficiary: {activePayment.farmerName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Payable Amount
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    ₹{activePayment.total.toLocaleString()}
                  </p>
                </div>
              </div>

              {showDueWarning && (
                <div className="flex gap-2 text-xs sm:text-sm text-orange-700 bg-orange-50 p-3 rounded animate-pulse">
                  <AlertCircle size={16} />
                  Payment must be completed within 15 days
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
              <CheckCircle size={40} className="mx-auto mb-4" />
              No pending payments
            </div>
          )}

          {/* TRANSACTIONS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
              <History size={18}/> Recent Transactions
            </h3>

            {TRANSACTIONS.map(txn => (
              <TransactionRow key={txn.id} txn={txn} />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-1">
          {activePayment && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border lg:sticky lg:top-8">
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                <PaymentMethodTab icon={Smartphone} label="UPI"
                  active={paymentMethod === 'upi'}
                  onClick={() => setPaymentMethod('upi')}
                />
                <PaymentMethodTab icon={CreditCard} label="Card"
                  active={paymentMethod === 'card'}
                  onClick={() => setPaymentMethod('card')}
                />
                <PaymentMethodTab icon={Landmark} label="NetBank"
                  active={paymentMethod === 'netbanking'}
                  onClick={() => setPaymentMethod('netbanking')}
                />
              </div>

              <button
                onClick={handlePay}
                disabled={paymentState === "processing"}
                className="w-full bg-emerald-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-emerald-700 flex justify-center items-center gap-2"
              >
                {paymentState === "processing"
                  ? "Processing..."
                  : `Pay ₹${activePayment.total.toLocaleString()}`}
                <ChevronRight size={18} />
              </button>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import {
//   FileText,
//   CheckCircle,
//   XCircle,
//   Edit3,
//   Printer,
//   Download,
//   ShieldCheck,
//   AlertTriangle,
//   Send,
//   Save,
//   Clock,
//   ChevronLeft
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../services/api";

// /* ---------------- STATUS BANNER ---------------- */

// const StatusBanner = ({ status }) => {
//   const configs = {
//     PENDING_APPROVAL: {
//       color: "bg-blue-50 border-blue-200 text-blue-800",
//       icon: Clock,
//       text: "Action Required: Review pending contract from Buyer."
//     },
//     ACTIVE: {
//       color: "bg-emerald-50 border-emerald-200 text-emerald-800",
//       icon: ShieldCheck,
//       text: "Contract Active: Legally binding. Production phase started."
//     },
//     REJECTED: {
//       color: "bg-red-50 border-red-200 text-red-800",
//       icon: XCircle,
//       text: "Contract Rejected."
//     }
//   };

//   const config = configs[status] || configs.PENDING_APPROVAL;
//   const Icon = config.icon;

//   return (
//     <div className={`flex items-center gap-3 p-4 rounded-lg border ${config.color} mb-6 shadow-sm`}>
//       <Icon size={24} />
//       <span className="font-semibold">{config.text}</span>
//     </div>
//   );
// };

// /* ---------------- MAIN COMPONENT ---------------- */

// export default function FarmerContracts() {
//   const { contractId } = useParams();
//   const navigate = useNavigate();

//   const [status, setStatus] = useState("PENDING_APPROVAL");
//   const [contractData, setContractData] = useState(null);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [contracts, setContracts] = useState([]);

//   /* 🔔 NOTIFICATION WHEN CONTRACT RECEIVED */
//   useEffect(() => {
//     if (status === "PENDING_APPROVAL") {
//       console.log("🔔 Notification: You have received a contract from buyer");
//     }
//   }, [status]);

//   /* ---------------- FARMER SIGNATURE ---------------- */

//   const [farmerSignature, setFarmerSignature] = useState({
//     name: "",
//     image: null
//   });

//   const handleSignatureUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFarmerSignature(prev => ({
//         ...prev,
//         image: file
//       }));
//     }
//   };

//   const handleSignatureName = (e) => {
//     setFarmerSignature(prev => ({
//       ...prev,
//       name: e.target.value
//     }));
//   };

//   /* ---------------- FETCH CONTRACT ---------------- */

//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         console.log("📡 Fetching contract:", contractId);
//         const res = await api.getContractById(contractId);

//         console.log("✅ Contract fetched:", res.data);
//         setContractData(res.data.contract);
//         setStatus(res.data.contract.status);
//       } catch (err) {
//         console.error("❌ Failed to fetch contract", err);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

//   if (contracts.length === 0) {
//     return (
//       <div className="text-center text-gray-500">
//         📄 No contracts received yet
//       </div>
//     );
//   }

//   /* ---------------- ACCEPT & SIGN ---------------- */

//   const handleAcceptContract = async () => {
//     if (!farmerSignature.name || !farmerSignature.image) {
//       alert("Please upload signature and type your name");
//       return;
//     }

//     const confirm = window.confirm(
//       "This is a legally binding action. Do you wish to sign?"
//     );
//     if (!confirm) return;

//     try {
//       console.log("✍️ Farmer signing contract");

//       const formData = new FormData();
//       formData.append("farmerName", farmerSignature.name);
//       formData.append("signature", farmerSignature.image);

//       const res = await api.farmerSignContract(contractId, formData);

//       console.log("✅ Contract signed & PDF stored:", res.data);
//       setStatus("ACTIVE");
//       setContractData(res.data.contract);

//     } catch (err) {
//       console.error("❌ Signing failed:", err);
//       alert("Failed to sign contract");
//     }
//   };

//   /* ---------------- REJECT ---------------- */

//   const handleRejectContract = () => setShowRejectModal(true);

//   const confirmReject = () => {
//     setStatus("REJECTED");
//     setShowRejectModal(false);
//   };

//   if (!contractData) {
//     return <div className="p-6 text-center text-gray-500">Loading contract...</div>;
//   }

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">

//       {/* HEADER */}
//       <div className="max-w-4xl mx-auto mb-6 flex justify-between">
//         <button onClick={() => navigate(-1)} className="flex items-center text-gray-600">
//           <ChevronLeft size={20} />
//           Back
//         </button>
//         <div className="flex gap-2">
//           <button className="px-3 py-2 bg-white border rounded">
//             <Printer size={16} /> Print
//           </button>
//           <button className="px-3 py-2 bg-white border rounded">
//             <Download size={16} /> Download PDF
//           </button>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto">
//         <StatusBanner status={status} />

//         {/* CONTRACT DOCUMENT (UNCHANGED UI) */}
//         <div className="bg-white border shadow-xl min-h-[800px] p-10">
//           <h1 className="text-3xl font-bold text-center mb-6">
//             Contract Farming Agreement
//           </h1>

//           <p><strong>Buyer:</strong> {contractData.buyer.name}</p>
//           <p><strong>Farmer:</strong> {contractData.farmer.name}</p>
//           <p><strong>Crop:</strong> {contractData.cropDetails.name}</p>
//           <p><strong>Quantity:</strong> {contractData.cropDetails.quantity}</p>
//           <p><strong>Price:</strong> ₹{contractData.cropDetails.pricePerQuintal}</p>

//           {/* SIGNATURE SECTION (UI SAME, LOGIC ADDED) */}
//           <div className="mt-12 grid grid-cols-2 gap-10">

//             {/* BUYER SIGNATURE */}
//             <div className="text-center">
//               <div className="border p-4 italic bg-green-50">
//                 Signed by Buyer
//               </div>
//               <p className="mt-2 font-bold">Buyer</p>
//             </div>

//             {/* FARMER SIGNATURE */}
//             <div className="text-center">
//               {status !== "ACTIVE" ? (
//                 <>
//                   <input type="file" accept="image/*" onChange={handleSignatureUpload} />
//                   <input
//                     type="text"
//                     placeholder="Type your full name"
//                     value={farmerSignature.name}
//                     onChange={handleSignatureName}
//                     className="block mx-auto mt-2 border-b"
//                   />
//                 </>
//               ) : (
//                 <div className="border p-4 italic bg-blue-50">
//                   Signed by {contractData.farmer.name}
//                 </div>
//               )}
//               <p className="mt-2 font-bold">Farmer</p>
//             </div>

//           </div>
//         </div>

//         {/* ACTION BAR */}
//         {status === "PENDING_APPROVAL" && (
//           <div className="sticky bottom-4 bg-white p-4 mt-6 rounded-xl shadow flex justify-between">
//             <button onClick={handleRejectContract} className="border px-6 py-2 text-red-600">
//               Reject
//             </button>
//             <button
//               onClick={handleAcceptContract}
//               className="bg-emerald-600 text-white px-8 py-2 rounded"
//             >
//               <CheckCircle size={18} /> Accept & Sign
//             </button>
//           </div>
//         )}
//       </div>

//       {/* REJECT MODAL */}
//       {showRejectModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg">
//             <h3 className="font-bold mb-4">Reject Contract?</h3>
//             <button onClick={() => setShowRejectModal(false)}>Cancel</button>
//             <button onClick={confirmReject} className="ml-4 text-red-600">
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../services/api";
import { FileText, Download, ShieldCheck } from "lucide-react";

export default function FarmerContracts() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await api.getFarmerContracts(user.id);
        setContracts(res.data);
      } catch (err) {
        console.error("❌ Failed to load contracts", err);
      }
    };

    fetchContracts();
  }, [user]);

  if (contracts.length === 0) {
    return (
      <div className="text-center text-gray-500">
        📄 No contracts received yet
      </div>
    );
  }

  const statusBadge = (status) => {
    const map = {
      draft: "bg-gray-100 text-gray-700",
      sent_to_farmer: "bg-blue-100 text-blue-700",
      active: "bg-emerald-100 text-emerald-700",
      completed: "bg-purple-100 text-purple-700"
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  const formatStatus = (status) =>
    status.replaceAll("_", " ").toUpperCase();
  // return (
  //   <div className="space-y-4">
  //     {contracts.map(contract => (
  //       <div key={contract._id} className="border p-6 rounded-lg bg-white">

  //         <h3 className="font-bold text-lg">{contract.commodity}</h3>
  //         <p>Status: {contract.status}</p>
  //         <p>Buyer Name: {contract.buyerName}</p>

  //         {contract.status === "sent_to_farmer" && (
  //           <div className="flex justify-center mt-4">
  //             <button
  //               onClick={() =>
  //                 navigate(`/dashboard/farmer/contracts/${contract._id}`)
  //               }
  //               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
  //             >
  //               View Contract
  //             </button>
  //           </div>
  //         )}

  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <ShieldCheck className="text-emerald-600" />
        My Contracts
      </h2>

      {contracts.map((c) => (
        <div
          key={c._id}
          className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {c.commodity} Contract
              </h3>
              <p className="text-sm text-gray-500">
                Buyer: {c.buyerName}
              </p>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${statusBadge(
                c.status
              )}`}
            >
              {formatStatus(c.status)}
            </span>
          </div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <p>
              <b>Quantity:</b> {c.quantity} {c.unit}
            </p>
            <p>
              <b>Price / Unit:</b> ₹{c.offerPrice}
            </p>
            <p>
              <b>Total Value:</b>{" "}
              ₹{(c.quantity * c.offerPrice).toLocaleString()}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50"
              onClick={() =>
                window.open(`/dashboard/buyer/contracts/${c._id}`)
              }
            >
              View Contract
            </button>

            {c.pdf?.url && (
              <a
                href={`http://localhost:4000/${c.pdf.url}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-emerald-700"
              >
                <Download size={23} /> Download PDF
              </a>
            )}
            {c.status === "sent_to_farmer" && (
             <div className="flex justify-center mt-4">
               <button
                 onClick={() =>
                   navigate(`/dashboard/farmer/contracts/${c._id}`)
                 }
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
               >
                 View Contract
               </button>
             </div>
           )}
          </div>
        </div>
      ))}
    </div>
  );
}

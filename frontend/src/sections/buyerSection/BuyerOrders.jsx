// import React from "react";
// import {
//   FileSignature,
//   Lock,
//   CheckCircle,
//   Clock
// } from "lucide-react";
// import ProcessTracker from "../../components/ProcessTracker";

// const BuyerOrders = ({ proposals = [], user }) => {
//   // 🔒 SAFETY
//   if (!user || !user.id) {
//     return <div className="text-center p-6">Loading Orders...</div>;
//   }

//   // 🔍 Filter buyer proposals
//   const myOrders = proposals.filter(
//     (p) => p.buyerId === user.id
//   );

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">My Orders & Proposals</h2>

//       {myOrders.length === 0 && (
//         <p className="text-gray-500 text-sm">
//           You haven’t made any offers yet.
//         </p>
//       )}

//       <div className="space-y-4">
//         {myOrders.map((p) => (
//           <div
//             key={p._id || p.createdAt}
//             className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition"
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <h3 className="font-bold text-lg">
//                   {p.commodity}
//                 </h3>

//                 <div className="flex gap-2 mt-1">
//                   <span
//                     className={`text-xs px-2 py-1 rounded font-bold uppercase ${
//                       p.status === "pending"
//                         ? "bg-gray-100 text-gray-700"
//                         : p.status === "accepted"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : p.status === "escrow_funded"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {p.status === "pending"
//                       ? "Proposal Sent"
//                       : p.status === "accepted"
//                       ? "Contract Drafting"
//                       : p.status === "escrow_funded"
//                       ? "Escrow Funded"
//                       : "Rejected"}
//                   </span>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold text-xl text-blue-700">
//                   ₹{p.offerPrice}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   per {p.unit || "Qtl"}
//                 </p>
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//               <p>
//                 <strong>Quantity:</strong> {p.quantity}
//               </p>
//               <p>
//                 <strong>Seller:</strong> {p.sellerName}
//               </p>
//               <p>
//                 <strong>Pickup Date:</strong>{" "}
//                 {new Date(p.pickupDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Location:</strong>{" "}
//                 {p.listing?.location}
//               </p>
//             </div>

//             {/* PROCESS TRACKER */}
//             {p.status !== "pending" && (
//               <div className="mt-4">
//                 <ProcessTracker
//                   status={p.status}
//                   signatures={p.signatures}
//                 />
//               </div>
//             )}

//             {/* ACTIONS */}
//             <div className="mt-4 flex justify-end gap-2">
//               {p.status === "accepted" && (
//                 <>
//                   {!p.signatures?.buyer && (
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-blue-700">
//                       <FileSignature size={16} />
//                       Sign Contract
//                     </button>
//                   )}

//                   {p.signatures?.buyer &&
//                     p.signatures?.farmer && (
//                       <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-green-700">
//                         <Lock size={16} />
//                         Deposit Escrow
//                       </button>
//                     )}
//                 </>
//               )}

//               {p.status === "escrow_funded" && (
//                 <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
//                   <CheckCircle size={18} />
//                   Funds secured in Escrow
//                 </div>
//               )}

//               {p.status === "pending" && (
//                 <div className="flex items-center gap-2 text-gray-500 text-sm">
//                   <Clock size={16} />
//                   Waiting for farmer response
//                 </div>
//               )}
              
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BuyerOrders;
// import React from "react"; status updated
// import {
//   FileSignature,
//   Lock,
//   CheckCircle,
//   Clock
// } from "lucide-react";
// import ProcessTracker from "../../components/ProcessTracker";
// import { useOutletContext } from "react-router-dom";

// const BuyerOrders = ({ proposals = [], user }) => {

//   // ✅ UPDATED: render log
//   console.log("🔁 BuyerOrders rendered");

//   // 🔒 SAFETY
//   if (!user || !user.id) {
//     return <div className="text-center p-6">Loading Orders...</div>;
//   }

//   // ✅ UPDATED: log incoming proposals
//   console.log("📦 BuyerOrders received proposals:", proposals);

//   // 🔍 Filter buyer proposals
//   const myOrders = Array.isArray(proposals)
//     ? proposals.filter(p => p.buyerId === user.id)
//     : [];

//   // ✅ UPDATED: log filtered orders
//   console.log("🧾 BuyerOrders myOrders:", myOrders);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">My Orders & Proposals</h2>

//       {myOrders.length === 0 && (
//         <p className="text-gray-500 text-sm">
//           You haven’t made any offers yet.
//         </p>
//       )}

//       <div className="space-y-4">
//         {myOrders.map((p) => (
//           <div
//             key={p._id || p.createdAt} // OK
//             className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition"
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <h3 className="font-bold text-lg">
//                   {p.commodity}
//                 </h3>

//                 <div className="flex gap-2 mt-1">
//                   <span
//                     className={`text-xs px-2 py-1 rounded font-bold uppercase ${
//                       p.status === "pending"
//                         ? "bg-gray-100 text-gray-700"
//                         : p.status === "accepted"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : p.status === "escrow_funded"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {p.status === "pending"
//                       ? "Proposal Sent"
//                       : p.status === "accepted"
//                       ? "Contract Drafting"
//                       : p.status === "escrow_funded"
//                       ? "Escrow Funded"
//                       : "Rejected"}
//                   </span>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold text-xl text-blue-700">
//                   ₹{p.offerPrice}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   per {p.unit || "Qtl"}
//                 </p>
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//               <p>
//                 <strong>Quantity:</strong> {p.quantity}
//               </p>
//               <p>
//                 <strong>Seller:</strong> {p.sellerName}
//               </p>
//               <p>
//                 <strong>Pickup Date:</strong>{" "}
//                 {p.pickupDate
//                   ? new Date(p.pickupDate).toLocaleDateString()
//                   : "—"}
//               </p>
//               <p>
//                 <strong>Location:</strong>{" "}
//                 {p.listing?.location || "—"}
//               </p>
//             </div>

//             {/* PROCESS TRACKER */}
//             {p.status !== "pending" && (
//               <div className="mt-4">
//                 <ProcessTracker
//                   status={p.status}
//                   signatures={p.signatures}
//                 />
//               </div>
//             )}

//             {/* ACTIONS */}
//             <div className="mt-4 flex justify-end gap-2">
//               {p.status === "accepted" && (
//                 <>
//                   {!p.signatures?.buyer && (
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-blue-700">
//                       <FileSignature size={16} />
//                       Sign Contract
//                     </button>
//                   )}

//                   {p.signatures?.buyer && p.signatures?.farmer && (
//                     <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-green-700">
//                       <Lock size={16} />
//                       Deposit Escrow
//                     </button>
//                   )}
//                 </>
//               )}

//               {p.status === "escrow_funded" && (
//                 <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
//                   <CheckCircle size={18} />
//                   Funds secured in Escrow
//                 </div>
//               )}

//               {p.status === "pending" && (
//                 <div className="flex items-center gap-2 text-gray-500 text-sm">
//                   <Clock size={16} />
//                   Waiting for farmer response
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BuyerOrders;
import React from "react";
import {
  FileSignature,
  Lock,
  CheckCircle,
  Clock
} from "lucide-react";
//import ProcessTracker from "../../components/ProcessTracker";
import { useOutletContext, useNavigate } from "react-router-dom";

const BuyerOrders = () => {
const { proposals, user } = useOutletContext();
  const navigate = useNavigate();

  // ✅ UPDATED: render log
  console.log("🔁 BuyerOrders rendered");

  // 🔒 SAFETY
  if (!user || !user.id) {
    return <div className="text-center p-6">Loading Orders...</div>;
  }

  // ✅ UPDATED: log incoming proposals
  console.log("📦 BuyerOrders received proposals:", proposals);

  // 🔍 Filter buyer proposals
  const myOrders = Array.isArray(proposals)
    ? proposals.filter(p => p.buyerId === user.id)
    : [];

  // ✅ UPDATED: log filtered orders
  console.log("🧾 BuyerOrders myOrders:", myOrders);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My Orders & Proposals</h2>

      {myOrders.length === 0 && (
        <p className="text-gray-500 text-sm">
          You haven’t made any offers yet.
        </p>
      )}

      <div className="space-y-4">
        {myOrders.map((p) => (
          <div
            key={p._id || p.createdAt}
            className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">
                  {p.listing?.commodity}
                </h3>

                {/* <div className="flex gap-2 mt-1 flex-wrap">
                  <span
                    className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                      p.status === "pending"
                        ? "bg-gray-100 text-gray-700"
                        : p.status === "accepted"
                        ? "bg-yellow-100 text-yellow-800"
                        : p.status === "escrow_funded"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {p.status === "pending"
                      ? "Proposal Sent"
                      : p.status === "accepted"
                      ? "Offer Accepted"
                      : p.status === "escrow_funded"
                      ? "Escrow Funded"
                      : "Rejected"}
                  </span>
                </div> */}
              </div>

              <div className="text-right">
                <p className="font-bold text-xl text-blue-700">
                  ₹{p.offerPrice}
                </p>
                <p className="text-xs text-gray-500">
                  per {p.unit || "Qtl"}
                </p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>
                <strong>Quantity:</strong> {p.quantity} {p.unit}
              </p>
              <p>
                <strong>Farmer Name:</strong> {p.farmerName}
              </p>
              <p>
                <strong>Pickup Date:</strong>{" "}
                {p.pickupDate
                  ? new Date(p.pickupDate).toLocaleDateString()
                  : "—"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {p.listing?.farmAddress || "—"}
              </p>
            </div>

            {/* PROCESS TRACKER */}
            {p.status !== "pending" && (
              <div className="mt-4">
                {/* <ProcessTracker
                  status={p.status}
                  signatures={p.signatures}
                /> */}
              </div>
            )}

            {/* ACTIONS */}
            <div className="mt-4 flex justify-end gap-2 flex-wrap">

              {/* ACCEPTED STATE */}
              {p.status === "accepted" && (
                <>
                  {/* Offer Accepted Indicator */}
                  <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded text-xs font-bold uppercase">
                    <CheckCircle size={23} />
                    Offer Accepted
                  </div>

                  {/* Next Step Button */}
                  {/* <button
                    onClick={() =>
                      navigate(`/dashboard/buyer/contracts/${p._id}`)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700"
                  >
                    Next Step
                  </button> */}
      <button
  onClick={() =>
    navigate(`/dashboard/buyer/contracts/${p._id}`)
  }
  className={`relative px-4 py-2 rounded text-sm font-bold text-white
    ${p.status === "accepted" ? "bg-green-600" : "bg-blue-600"}
  `}
>
  {p.status === "accepted" && (
    <span className="absolute inset-0 rounded animate-ping bg-green-400 opacity-30"></span>
  )}
  <span className="relative z-10">Next Step</span>
</button>

                </>
              )}

              {/* ESCROW FUNDED */}
              {p.status === "escrow_funded" && (
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                  <CheckCircle size={23} />
                  Funds secured in Escrow
                </div>
              )}

              {/* PENDING */}
              {p.status === "pending" && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock size={23} />
                  Waiting for farmer response
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerOrders;

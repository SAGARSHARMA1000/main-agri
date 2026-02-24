
// import React, { useEffect, useState } from "react";
// import {
//   CheckCircle,
//   Clock
// } from "lucide-react";
// import { useOutletContext, useNavigate } from "react-router-dom";

// const BuyerOrders = () => {
//   const { proposals, user } = useOutletContext();
//   const navigate = useNavigate();

//   const [hiddenButtons, setHiddenButtons] = useState([]);

//   // 🔹 Load hidden buttons from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("hiddenNextSteps");
//     if (stored) {
//       setHiddenButtons(JSON.parse(stored));
//     }
//   }, []);

//   // 🔹 Save to localStorage whenever updated
//   useEffect(() => {
//     localStorage.setItem(
//       "hiddenNextSteps",
//       JSON.stringify(hiddenButtons)
//     );
//   }, [hiddenButtons]);

//   if (!user || !user.id) {
//     return <div className="text-center p-6">Loading Orders...</div>;
//   }

//   const myOrders = Array.isArray(proposals)
//     ? proposals.filter(p => p.buyerId === user.id)
//     : [];

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">My Orders & Proposals</h2>

//       {myOrders.length === 0 && (
//         <p className="text-gray-500 text-sm">
//           You haven’t made any offers yet.
//         </p>
//       )}

//       <div className="space-y-4">
//         {myOrders.map((p) => {
//           const isHidden = hiddenButtons.includes(p._id);

//           return (
//             <div
//               key={p._id}
//               className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition"
//             >
//               {/* HEADER */}
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="font-bold text-lg">
//                     {p.listing?.commodity}
//                   </h3>
//                 </div>

//                 <div className="text-right">
//                   <p className="font-bold text-xl text-blue-700">
//                     ₹{p.offerPrice}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     per {p.unit || "Qtl"}
//                   </p>
//                 </div>
//               </div>

//               {/* DETAILS */}
//               <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//                 <p>
//                   <strong>Quantity:</strong> {p.quantity} {p.unit}
//                 </p>
//                 <p>
//                   <strong>Farmer Name:</strong> {p.farmerName}
//                 </p>
//                 <p>
//                   <strong>Pickup Date:</strong>{" "}
//                   {p.pickupDate
//                     ? new Date(p.pickupDate).toLocaleDateString()
//                     : "—"}
//                 </p>
//                 <p>
//                   <strong>Location:</strong>{" "}
//                   {p.listing?.farmAddress || "—"}
//                 </p>
//               </div>

//               {/* ACTIONS */}
//               <div className="mt-4 flex justify-end gap-2 flex-wrap">

//                 {/* ACCEPTED */}
//                 {p.status === "accepted" && !isHidden && (
//                   <>
//                     <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded text-xs font-bold uppercase">
//                       <CheckCircle size={18} />
//                       Offer Accepted
//                     </div>

//                     <button
//                       onClick={() => {
//                         // hide button permanently
//                         setHiddenButtons(prev => [...prev, p._id]);

//                         navigate(`/dashboard/buyer/contracts/${p._id}`);
//                       }}
//                       className="relative px-4 py-2 rounded text-sm font-bold text-white bg-green-600"
//                     >
//                       <span className="absolute inset-0 rounded animate-ping bg-green-400 opacity-30"></span>
//                       <span className="relative z-10">Next Step</span>
//                     </button>
//                   </>
//                 )}

//                 {/* IF ALREADY CLICKED */}
//                 {p.status === "accepted" && isHidden && (
//                   <div className="text-green-700 text-sm font-bold">
//                     Contract Created
//                   </div>
//                 )}

//                 {/* ESCROW */}
//                 {p.status === "escrow_funded" && (
//                   <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
//                     <CheckCircle size={18} />
//                     Funds secured in Escrow
//                   </div>
//                 )}

//                 {/* PENDING */}
//                 {p.status === "pending" && (
//                   <div className="flex items-center gap-2 text-gray-500 text-sm">
//                     <Clock size={18} />
//                     Waiting for farmer response
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BuyerOrders;
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock
} from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";

const BuyerOrders = () => {
  const { proposals, user } = useOutletContext();
  const navigate = useNavigate();

  const [hiddenButtons, setHiddenButtons] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("hiddenNextSteps");
    if (stored) {
      setHiddenButtons(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "hiddenNextSteps",
      JSON.stringify(hiddenButtons)
    );
  }, [hiddenButtons]);

  if (!user || !user.id) {
    return (
      <div className="text-center p-6 text-sm sm:text-base">
        Loading Orders...
      </div>
    );
  }

  const myOrders = Array.isArray(proposals)
    ? proposals.filter(p => p.buyerId === user.id)
    : [];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
      
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6">
        My Orders & Proposals
      </h2>

      {myOrders.length === 0 && (
        <p className="text-gray-500 text-sm">
          You haven’t made any offers yet.
        </p>
      )}

      <div className="space-y-4">
        {myOrders.map((p) => {
          const isHidden = hiddenButtons.includes(p._id);

          return (
            <div
              key={p._id}
              className="border border-gray-200 rounded-lg p-4 sm:p-5 hover:border-blue-300 transition"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                
                <div>
                  <h3 className="font-bold text-base sm:text-lg wrap-break-word">
                    {p.listing?.commodity}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <p className="font-bold text-lg sm:text-xl text-blue-700">
                    ₹{p.offerPrice}
                  </p>
                  <p className="text-xs text-gray-500">
                    per {p.unit || "Qtl"}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <p className="wrap-break-word">
                  <strong>Quantity:</strong> {p.quantity} {p.unit}
                </p>
                <p className="wrap-break-word">
                  <strong>Farmer Name:</strong> {p.farmerName}
                </p>
                <p>
                  <strong>Pickup Date:</strong>{" "}
                  {p.pickupDate
                    ? new Date(p.pickupDate).toLocaleDateString()
                    : "—"}
                </p>
                <p className="wrap-break-word">
                  <strong>Location:</strong>{" "}
                  {p.listing?.farmAddress || "—"}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-2 flex-wrap">
                
                {/* ACCEPTED */}
                {p.status === "accepted" && !isHidden && (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded text-xs font-bold uppercase w-full sm:w-auto">
                      <CheckCircle size={18} />
                      Offer Accepted
                    </div>

                    <button
                      onClick={() => {
                        setHiddenButtons(prev => [...prev, p._id]);
                        navigate(`/dashboard/buyer/contracts/${p._id}`);
                      }}
                      className="relative px-4 py-2 rounded text-sm font-bold text-white bg-green-600 w-full sm:w-auto"
                    >
                      <span className="absolute inset-0 rounded animate-ping bg-green-400 opacity-30"></span>
                      <span className="relative z-10">Next Step</span>
                    </button>
                  </>
                )}

                {/* IF ALREADY CLICKED */}
                {p.status === "accepted" && isHidden && (
                  <div className="text-green-700 text-sm font-bold w-full sm:w-auto text-center sm:text-left">
                    Contract Created
                  </div>
                )}

                {/* ESCROW */}
                {p.status === "escrow_funded" && (
                  <div className="flex items-center gap-2 text-green-700 font-bold text-sm w-full sm:w-auto">
                    <CheckCircle size={18} />
                    Funds secured in Escrow
                  </div>
                )}

                {/* PENDING */}
                {p.status === "pending" && (
                  <div className="flex items-center gap-2 text-gray-500 text-sm w-full sm:w-auto">
                    <Clock size={18} />
                    Waiting for farmer response
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyerOrders;
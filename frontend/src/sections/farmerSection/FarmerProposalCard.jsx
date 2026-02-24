
// import React from "react";
// import {
//   User,
//   MapPin,
//   IndianRupee,
//   CheckCircle,
//   XCircle
// } from "lucide-react";

// const FarmerProposalCard = ({ proposal, onAccept, onReject }) => {
//   const {
//     _id,
//     buyerName,
//     listing,
//     offerPrice,
//     unit,
//     status,
//     deliveryAddress,
//     quantity
//   } = proposal;

//   return (
//     <div
//       className="
//         bg-white border rounded-2xl p-5 space-y-4
//         shadow-sm
//         transition-all duration-300 ease-out
//         hover:-translate-y-1 hover:shadow-xl
//         hover:border-green-300
//       "
//     >
//       {/* HEADER */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-lg font-bold text-gray-800">
//             {listing.commodity}
//           </h3>
//           <p className="text-sm text-gray-500">
//             Quantity: <span className="font-medium">{quantity} {unit}</span>
//           </p>
//         </div>

//         <span
//           className={`
//             px-3 py-1 rounded-full text-xs font-bold tracking-wide
//             transition-all duration-300
//             ${
//               status === "pending"
//                 ? "bg-yellow-100 text-yellow-700 animate-pulse"
//                 : status === "accepted"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }
//           `}
//         >
//           {status.toUpperCase()}
//         </span>
//       </div>

//       {/* DETAILS */}
//       <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
//         <div className="flex items-center gap-2 group">
//           <User
//             size={20}
//             className="text-green-600 group-hover:scale-110 transition"
//           />
//           Buyer: <b>{buyerName}</b>
//         </div>

//         <div className="flex items-center gap-2 group">
//           <MapPin
//             size={20}
//             className="text-green-600 group-hover:scale-110 transition"
//           />
//           {deliveryAddress}
//         </div>

//         <div className="flex items-center gap-2 group">
//           <IndianRupee
//             size={20}
//             className="text-green-600 group-hover:scale-110 transition"
//           />
//           Offer: <b>₹{offerPrice} / {unit}</b>
//         </div>
//       </div>

//       {/* ACTIONS */}
//       {status === "pending" && (
//         <div className="flex gap-3 pt-4">
//           <button
//             onClick={() => onAccept(_id)}
//             className="
//               flex items-center gap-2
//               bg-green-600 text-white
//               px-4 py-2 rounded-lg
//               font-medium
//               transition-all duration-200
//               hover:bg-green-700 hover:shadow-lg
//               active:scale-95
//             "
//           >
//             <CheckCircle size={20} /> Accept
//           </button>

//           <button
//             onClick={() => onReject(_id)}
//             className="
//               flex items-center gap-2
//               bg-red-500 text-white
//               px-4 py-2 rounded-lg
//               font-medium
//               transition-all duration-200
//               hover:bg-red-600 hover:shadow-lg
//               active:scale-95
//             "
//           >
//             <XCircle size={20} /> Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FarmerProposalCard;
import React from "react";
import {
  User,
  MapPin,
  IndianRupee,
  CheckCircle,
  XCircle
} from "lucide-react";

const FarmerProposalCard = ({ proposal, onAccept, onReject }) => {
  const {
    _id,
    buyerName,
    listing,
    offerPrice,
    unit,
    status,
    deliveryAddress,
    quantity
  } = proposal;

  return (
    <div
      className="
        bg-white border rounded-2xl p-4 sm:p-5 space-y-4
        shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        hover:border-green-300
      "
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 wrap-break-word">
            {listing.commodity}
          </h3>
          <p className="text-sm text-gray-500">
            Quantity:{" "}
            <span className="font-medium">
              {quantity} {unit}
            </span>
          </p>
        </div>

        <span
          className={`
            w-fit
            px-3 py-1 rounded-full text-xs font-bold tracking-wide
            transition-all duration-300
            ${
              status === "pending"
                ? "bg-yellow-100 text-yellow-700 animate-pulse"
                : status === "accepted"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
        <div className="flex items-start gap-2 group wrap-break-word">
          <User
            size={18}
            className="text-green-600 group-hover:scale-110 transition shrink-0"
          />
          <span>
            Buyer: <b>{buyerName}</b>
          </span>
        </div>

        <div className="flex items-start gap-2 group wrap-break-word">
          <MapPin
            size={18}
            className="text-green-600 group-hover:scale-110 transition shrink-0"
          />
          <span>{deliveryAddress}</span>
        </div>

        <div className="flex items-start gap-2 group wrap-break-word">
          <IndianRupee
            size={18}
            className="text-green-600 group-hover:scale-110 transition shrink-0"
          />
          <span>
            Offer: <b>₹{offerPrice} / {unit}</b>
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      {status === "pending" && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => onAccept(_id)}
            className="
              flex items-center justify-center gap-2
              bg-green-600 text-white
              px-4 py-2 rounded-lg
              font-medium text-sm sm:text-base
              transition-all duration-200
              hover:bg-green-700 hover:shadow-lg
              active:scale-95
              w-full sm:w-auto
            "
          >
            <CheckCircle size={18} /> Accept
          </button>

          <button
            onClick={() => onReject(_id)}
            className="
              flex items-center justify-center gap-2
              bg-red-500 text-white
              px-4 py-2 rounded-lg
              font-medium text-sm sm:text-base
              transition-all duration-200
              hover:bg-red-600 hover:shadow-lg
              active:scale-95
              w-full sm:w-auto
            "
          >
            <XCircle size={18} /> Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default FarmerProposalCard;
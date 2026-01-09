// import React from "react";

// const FarmerListings = ({ listings = [] }) => {
//   if (!Array.isArray(listings) || listings.length === 0) {
//     return (
//       <div className="text-gray-500 text-center py-8">
//         No listings found. Add your first crop listing.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {listings.map((listing) => (
//         <div
//           key={listing.id}
//           className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
//         >
//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-gray-800">
//               {listing.commodity || "Unknown Crop"}
//             </h3>
//             <span className="text-xs text-gray-500">
//               {listing.date || "—"}
//             </span>
//           </div>

//           {/* DETAILS */}
//           <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
//             <p>
//               <span className="font-medium">Quantity:</span>{" "}
//               {listing.quantity || "—"}
//             </p>
//             <p>
//               <span className="font-medium">Price:</span>{" "}
//               ₹{listing.price || "—"}
//             </p>
//             <p>
//               <span className="font-medium">Location:</span>{" "}
//               {listing.farmAddress || "—"}
//             </p>
//             <p>
//               <span className="font-medium">Negotiation:</span>{" "}
//               {listing.negotiationAllowed ? "Allowed" : "Not Allowed"}
//             </p>
//           </div>

//           {/* NEGOTIATION RANGE */}
//           {listing.negotiationEnabled && (
//             <p className="mt-2 text-sm text-gray-600">
//               Negotiation Range:{" "}
//               <span className="font-semibold">
//                 ₹{listing.negotiationRange}
//               </span>
//             </p>
//           )}

//           {/* IMAGE */}
//           {listing.image && (
//             <div className="mt-3">
//               <img
//                 src={
//                   typeof listing.image === "string"
//                     ? listing.image
//                     : URL.createObjectURL(listing.image)
//                 }
//                 alt="Crop"
//                 className="w-32 h-32 object-cover rounded-lg border"
//               />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FarmerListings;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import EditListingModal from "./EditListingModal";
import api from "../../services/api";
import { useOutletContext } from "react-router-dom";

const FarmerListings = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
   const { listings, fetchListings,refreshMarketplace } = useOutletContext();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;

    try {
      await api.deleteListing(id); 
      fetchListings();
      refreshMarketplace();
    } catch (err) {
      alert("Failed to delete listing");
    }
  };

  if (!listings.length) {
    return (
      <div className="text-gray-500 text-center py-8">
        No listings found. Add your first crop listing 🌱
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {listings.map((listing, index) => (
        <motion.div
          key={listing._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow hover:shadow-xl transition relative overflow-hidden"
        >
          {/* IMAGE */}
          {listing.image && (
            <img
              src={listing.image}
              alt="crop"
              className="h-40 w-full object-cover"
            />
          )}

          {/* 3 DOT MENU */}
          <div className="absolute top-3 right-3">
            <button onClick={() => setOpenMenu(openMenu === listing._id ? null : listing._id)}>
              <MoreVertical className="text-gray-600" />
            </button>

            {openMenu === listing._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-10">
                <button
                  onClick={() =>{ alert("Open edit modal")
                   setSelectedListing(listing);
                   setIsEditOpen(true);
                  }}
                  className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  🗑 Delete
                </button>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-4 space-y-2 h-35">
            <h3 className="text-lg font-bold">{listing.commodity}</h3>

            <div className="grid grid-cols-2 text-sm text-gray-600 gap-y-1">
              <p><b>Qty:</b> {listing.quantity}</p>
              <p><b>Price:</b> ₹{listing.price}</p>
              <p><b>Location:</b> {listing.farmAddress}</p>
              <p><b>Negotiation:</b> {listing.negotiationAllowed ? "Yes" : "No"}</p>
            </div>

            {listing.negotiationRange && (
              <p className="text-sm text-gray-500">
                Negotiation up to ₹{listing.negotiationRange}
              </p>
            )}
          </div>
        </motion.div>
      ))}
      <EditListingModal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  listing={selectedListing}
  fetchListings={fetchListings}
  refreshMarketplace={refreshMarketplace}
/>

    </div>
    
    
  );
  
};

export default FarmerListings;

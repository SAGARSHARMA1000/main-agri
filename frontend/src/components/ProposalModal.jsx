// import React, { useState } from "react";

// const ProposalModal = ({ isOpen, onClose, listing, onSubmit }) => {
//   const [offer, setOffer] = useState({
//     price: "",
//     quantity: "",
//     date: "",
//     unit: "Qtl",
//     note: ""
//   });

//   if (!isOpen || !listing) return null;

//   // ✅ Quick negotiation helper
//   const applyNegotiation = (diff) => {
//     if (!listing.price) return;
//     setOffer((prev) => ({
//       ...prev,
//       price: Math.max(0, Number(listing.price) - diff)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSubmit({
//       listingId: listing.id || listing._id,
//       listing,
//       commodity: listing.commodity,
//       sellerId: listing.sellerId,
//       sellerName: listing.sellerName || listing.seller,
//       offerPrice: offer.price,
//       quantity: offer.quantity,
//       unit: offer.unit,
//       pickupDate: offer.date,
//       note: offer.note,
//       status: "pending",
//       createdAt: new Date().toISOString()
//     });

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">

//         <h3 className="text-xl font-bold mb-4">
//           Send Proposal for {listing.commodity}
//         </h3>

//         {/* Listing summary */}
//         <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded space-y-1">
//           <p>
//             Asking Price:{" "}
//             <strong>₹{listing.price}/{offer.unit}</strong>
//           </p>
//           <p>
//             Available Qty: <strong>{listing.quantity}</strong>
//           </p>
//           <p>
//             Seller: <strong>{listing.sellerName || listing.seller}</strong>
//           </p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* OFFER PRICE */}
//           <div>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//               Your Price Offer (Negotiable)
//             </label>

//             <input
//               required
//               type="number"
//               className="w-full border rounded p-2"
//               value={offer.price}
//               onChange={(e) =>
//                 setOffer({ ...offer, price: e.target.value })
//               }
//             />

//             {/* QUICK NEGOTIATION */}
//             <div className="flex gap-2 mt-2 text-xs">
//               {[50, 100, 200].map((val) => (
//                 <button
//                   key={val}
//                   type="button"
//                   onClick={() => applyNegotiation(val)}
//                   className="px-3 py-1 border rounded hover:bg-gray-100"
//                 >
//                   -₹{val}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* QUANTITY */}
//           <div>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//               Quantity Required
//             </label>
//             <input
//               required
//               type="text"
//               className="w-full border rounded p-2"
//               value={offer.quantity}
//               onChange={(e) =>
//                 setOffer({ ...offer, quantity: e.target.value })
//               }
//             />
//           </div>

//           {/* UNIT */}
//           <div>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//               Unit
//             </label>
//             <select
//               className="w-full border rounded p-2"
//               value={offer.unit}
//               onChange={(e) =>
//                 setOffer({ ...offer, unit: e.target.value })
//               }
//             >
//               <option value="Qtl">Quintal</option>
//               <option value="Kg">Kg</option>
//             </select>
//           </div>

//           {/* PICKUP DATE */}
//           <div>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//               Proposed Pickup Date
//             </label>
//             <input
//               required
//               type="date"
//               className="w-full border rounded p-2"
//               value={offer.date}
//               onChange={(e) =>
//                 setOffer({ ...offer, date: e.target.value })
//               }
//             />
//           </div>

//           {/* NOTE TO FARMER */}
//           <div>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//               Message to Farmer (optional)
//             </label>
//             <textarea
//               rows="3"
//               className="w-full border rounded p-2"
//               placeholder="Any special requirement or message…"
//               value={offer.note}
//               onChange={(e) =>
//                 setOffer({ ...offer, note: e.target.value })
//               }
//             />
//           </div>

//           {/* ACTIONS */}
//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700"
//             >
//               Send Offer
//             </button>
//           </div>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default ProposalModal;
// import React, { useState } from "react";

// const ProposalModal = ({ isOpen, onClose, listing, user, onSubmit }) => {
//   const [offer, setOffer] = useState({
//     offerPrice: "",
//     quantity: "",
//     unit: "Qtl",
//     deliveryAddress:"",
//     pickupDate: "",
//     note: ""
//   });

//   if (!isOpen || !listing) return null;

//   /* QUICK NEGOTIATION BUTTONS */
//   const applyNegotiation = (diff) => {
//     if (!listing.price) return;
//     setOffer((prev) => ({
//       ...prev,
//       offerPrice: Math.max(0, Number(listing.price) - diff)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // ✅ FINAL PAYLOAD (MATCHES PROPOSAL SCHEMA)
//     const payload = {
//       listingId: listing._id || listing.id,

//       listing: {
//         commodity: listing.commodity,
//         quantity: listing.quantity,
//         price: listing.price,
//         quality: listing.quality,
//         farmAddress: listing.farmAddress
//       },
//       negotiation:listing.negotiationAllowed,

  

//       // BUYER INFO (required)
//       buyerId: user?.id || "b1",              // temp fallback
//       buyerName: user?.name || "Demo Buyer",

//       // FARMER INFO
//       //sellerId: listing.sellerId || "",
//       farmerId:listing.farmerId,
//       farmerName: listing.farmerName|| "Demo Farmer",

//       // OFFER DETAILS
//       offerPrice: Number(offer.offerPrice),
//       quantity: offer.quantity,
//       unit: offer.unit,
//       deliveryAddress:offer.deliveryAddress,
//       pickupDate: offer.pickupDate,
//       note: offer.note,

//       status: "pending"
//     };

//     onSubmit(payload);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">

//         <h3 className="text-xl font-bold mb-4">
//           Send Proposal for {listing.commodity}
//         </h3>

//         {/* LISTING SNAPSHOT */}
//         <div className="mb-4 text-lg bg-gray-50 p-3 rounded space-y-1">
//           <p><b>Price:</b> ₹{listing.price}/{offer.unit}</p>
//           <p><b>Available Qty:</b> {listing.quantity}</p>
//           <p><b>Location:</b> {listing.farmAddress}</p>
//           <p><b>Farmer Name:</b> {listing.farmerName}</p>
//           <p><b></b> {listing.negotiationAllowed?"Negotiation Allowed":"Fixed Price"}</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* OFFER PRICE */}
//           <div>
//             <label className="text-xs font-bold uppercase text-gray-500">
//               Your Offer Price
//             </label>
//             <input
//               required
//               type="number"
//               className="w-full border rounded p-2"
//               value={offer.offerPrice}
//               onChange={(e) =>
//                 setOffer({ ...offer, offerPrice: e.target.value })
//               }
//             />

//             <div className="flex gap-2 mt-2 text-xs">
//               {[50, 100, 200].map((val) => (
//                 <button
//                   key={val}
//                   type="button"
//                   onClick={() => applyNegotiation(val)}
//                   className="px-3 py-1 border rounded hover:bg-gray-100"
//                 >
//                   -₹{val}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* QUANTITY */}
//           <div>
//             <label className="text-xs font-bold uppercase text-gray-500">
//               Quantity Required
//             </label>
//             <input
//               required
//               type="text"
//               className="w-full border rounded p-2"
//               value={offer.quantity}
//               onChange={(e) =>
//                 setOffer({ ...offer, quantity: e.target.value })
//               }
//             />
//           </div>

//           {/* UNIT */}
//           <div>
//             <label className="text-xs font-bold uppercase text-gray-500">
//               Unit
//             </label>
//             <select
//               className="w-full border rounded p-2"
//               value={offer.unit}
//               onChange={(e) =>
//                 setOffer({ ...offer, unit: e.target.value })
//               }
//             >
//               <option value="Qtl">Quintal</option>
//               <option value="Kg">Kg</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-xs font-bold uppercase text-gray-500">
//               Delivery Address
//             </label>
//             <input
//               required
//               type="text"
//               className="w-full border rounded p-2"
//               placeholder="Enter your delivery address"
//               value={offer.deliveryAddress}
//               onChange={(e) =>
//                 setOffer({ ...offer, deliveryAddress: e.target.value })
//               }
//             />
//           </div>

//           {/* PICKUP DATE */}
//           <div>
//             <label className="text-xs font-bold uppercase text-gray-500">
//               Pickup Date
//             </label>
//             <input
//               required
//               type="date"
//               className="w-full border rounded p-2"
//               value={offer.pickupDate}
//               onChange={(e) =>
//                 setOffer({ ...offer, pickupDate: e.target.value })
//               }
//             />
//           </div>

//           {/* NOTE */}
//           <div>
//             <label className="text-xs font-bold uppercase text-gray-500">
//               Message to Farmer
//             </label>
//             <textarea
//               rows="3"
//               className="w-full border rounded p-2"
//               value={offer.note}
//               onChange={(e) =>
//                 setOffer({ ...offer, note: e.target.value })
//               }
//             />
//           </div>

//           {/* ACTIONS */}
//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700"
//             >
//               Send Offer
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProposalModal;
import React, { useState, useEffect } from "react";

const ProposalModal = ({ isOpen, onClose, listing, user, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const [offer, setOffer] = useState({
    offerPrice: "",
    quantity: "",
    unit: "Qtl",
    deliveryAddress: "",
    pickupDate: "",
    note: ""
  });

  /* 🔒 SET FIXED PRICE IF NEGOTIATION NOT ALLOWED */
  useEffect(() => {
    if (listing && listing.negotiationAllowed === false) {
      setOffer((prev) => ({
        ...prev,
        offerPrice: listing.price
      }));
    }
  }, [listing]);

  if (!isOpen || !listing) return null;

  /* QUICK NEGOTIATION BUTTONS */
  const applyNegotiation = (diff) => {
    if (!listing.negotiationAllowed) return;
    setOffer((prev) => ({
      ...prev,
      offerPrice: Math.max(0, Number(listing.price) - diff)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      listingId: listing._id || listing.id,
      listing: {
        commodity: listing.commodity,
        quantity: listing.quantity,
        price: listing.price,
        quality: listing.quality,
        farmAddress: listing.farmAddress
      },
      negotiation: listing.negotiationAllowed,

      buyerId: user?.id || "b1",
      buyerName: user?.name || "Demo Buyer",

      farmerId: listing.farmerId,
      farmerName: listing.farmerName || "Demo Farmer",

      offerPrice: Number(offer.offerPrice),
      quantity: offer.quantity,
      unit: offer.unit,
      deliveryAddress: offer.deliveryAddress,
      pickupDate: offer.pickupDate,
      note: offer.note,

      status: "pending"
    };

    await onSubmit(payload);

    setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 600); // smooth UX delay
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">

        <h3 className="text-xl font-bold mb-4">
          Send Proposal for {listing.commodity}
        </h3>

        {/* LISTING SNAPSHOT */}
        <div className="mb-4 bg-gray-50 p-3 rounded space-y-1 text-sm">
          <p><b>Price:</b> ₹{listing.price}/{offer.unit}</p>
          <p><b>Available Qty:</b> {listing.quantity}</p>
          <p><b>Location:</b> {listing.farmAddress}</p>
          <p><b>Farmer:</b> {listing.farmerName}</p>
          <p className="font-semibold">
            {listing.negotiationAllowed ? "Negotiation Allowed" : "Fixed Price"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* OFFER PRICE */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Your Offer Price
            </label>
            <input
              required
              type="number"
              disabled={!listing.negotiationAllowed}
              className={`w-full border rounded p-2 ${
                !listing.negotiationAllowed ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              value={offer.offerPrice}
              onChange={(e) =>
                setOffer({ ...offer, offerPrice: e.target.value })
              }
            />

            {listing.negotiationAllowed && (
              <div className="flex gap-2 mt-2 text-xs">
                {[50, 100, 200].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => applyNegotiation(val)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    -₹{val}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Quantity Required
            </label>
            <input
              required
              type="text"
              className="w-full border rounded p-2"
              value={offer.quantity}
              onChange={(e) =>
                setOffer({ ...offer, quantity: e.target.value })
              }
            />
          </div>

          {/* UNIT */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Unit
            </label>
            <select
              className="w-full border rounded p-2"
              value={offer.unit}
              onChange={(e) =>
                setOffer({ ...offer, unit: e.target.value })
              }
            >
              <option value="Qtl">Quintal</option>
              <option value="Kg">Kg</option>
            </select>
          </div>

          {/* DELIVERY ADDRESS */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Delivery Address
            </label>
            <input
              required
              type="text"
              className="w-full border rounded p-2"
              value={offer.deliveryAddress}
              onChange={(e) =>
                setOffer({ ...offer, deliveryAddress: e.target.value })
              }
            />
          </div>

          {/* PICKUP DATE */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Pickup Date
            </label>
            <input
              required
              type="date"
              className="w-full border rounded p-2"
              value={offer.pickupDate}
              onChange={(e) =>
                setOffer({ ...offer, pickupDate: e.target.value })
              }
            />
          </div>

          {/* NOTE */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Message to Farmer
            </label>
            <textarea
              rows="3"
              className="w-full border rounded p-2"
              value={offer.note}
              onChange={(e) =>
                setOffer({ ...offer, note: e.target.value })
              }
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded font-bold text-white transition transform ${
                submitting
                  ? "bg-green-400 scale-95 animate-pulse cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:scale-105"
              }`}
            >
              {submitting ? "Sending..." : "Send Offer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProposalModal;

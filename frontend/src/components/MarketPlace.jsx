
// import React, { useState } from "react";
// import { Filter, BarChart3, MapPin, User, Wheat } from "lucide-react";
// import ProposalModal from "./ProposalModal";

// const Marketplace = ({ listings = [], user, onSendProposal }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({ state: '', crop: '', district: '' });
//   const [selectedListing, setSelectedListing] = useState(null);

//   const uniqueCrops = [...new Set(listings.map(l => l.commodity.split(' ')[0]))];
  
//   const filteredListings = listings.filter(item => {
//     const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCrop = filters.crop ? item.commodity.includes(filters.crop) : true;
//     const matchesState = filters.state ? item.location.includes(filters.state) : true;
//     return matchesSearch && matchesCrop && matchesState;
//   });

//   return (
//     <div className="py-8 bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-4">
//         {user?.role === 'buyer' && (
//           <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
//             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter size={18}/> Buyer Filters & Comparison</h3>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                <input 
//                   type="text" 
//                   placeholder="Search keywords..." 
//                   className="border rounded-lg p-2.5 focus:ring-green-500 focus:outline-none"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                <select className="border rounded-lg p-2.5 bg-white" onChange={e => setFilters({...filters, crop: e.target.value})}>
//                  <option value="">All Crops</option>
//                  {uniqueCrops.map(c => <option key={c} value={c}>{c}</option>)}
//                </select>
//                <input type="text" placeholder="Filter by State" className="border rounded-lg p-2.5" onChange={e => setFilters({...filters, state: e.target.value})} />
//                <button className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Compare Prices</button>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredListings.map((item) => (
//             <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col h-full">
//               <div className="h-32 bg-gradient-to-r from-green-50 to-green-100 relative p-4 flex items-center justify-center">
//                 <Wheat className="h-16 w-16 text-green-300" />
//                 <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-xs font-bold text-green-700 shadow-sm">{item.quality}</div>
//               </div>
              
//               <div className="p-5 flex-grow">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-xl font-bold text-gray-800">{item.commodity}</h3>
//                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.date}</span>
//                 </div>
                
//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center text-gray-600 text-sm"><BarChart3 size={16} className="mr-2 text-green-600" /> Qty: <span className="font-semibold text-gray-800 ml-1">{item.quantity}</span></div>
//                   <div className="flex items-center text-gray-600 text-sm"><MapPin size={16} className="mr-2 text-green-600" /> {item.location}</div>
//                   <div className="flex items-center text-gray-600 text-sm"><User size={16} className="mr-2 text-green-600" /> Seller: {item.seller}</div>
//                 </div>
                
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
//                   <div>
//                     <span className="text-xs text-gray-500">Ask Price</span>
//                     <div className="text-xl font-bold text-green-700">₹{item.price}<span className="text-sm text-gray-500 font-normal">/Qtl</span></div>
//                   </div>
//                   {user?.role === 'buyer' ? (
//                     <button 
//                       onClick={() => setSelectedListing(item)}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm shadow-md"
//                     >
//                       Make Offer
//                     </button>
//                   ) : (
//                     <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Login as Buyer to offer</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <ProposalModal 
//         isOpen={!!selectedListing} 
//         onClose={() => setSelectedListing(null)} 
//         listing={selectedListing}
//         onSubmit={(data) => {
//           onSendProposal({ ...data, listing: selectedListing });
//           setSelectedListing(null);
//         }}
//       />
//     </div>
//   );
// };

// export default Marketplace;
// import React, { useState, useMemo } from "react";
// import {
//   Filter,BarChart3,MapPin,User,Wheat,Star
// } from "lucide-react";
// import ProposalModal from "./ProposalModal";

// /* ---------------- TEMPORARY LISTINGS ---------------- */
// const TEMP_LISTINGS = [
//   {
//     _id: "temp-1",
//     commodity: "Wheat",
//     quantity: "40 Quintal",
//     price: 2350,
//     location: "MP",
//     sellerName: "Demo Farmer",
//     date: "Today",
//     quality: "Premium",
//     rating: 4.5,
//     ratingCount: 10
//   },
//   {
//     _id: "temp-2",
//     commodity: "Mustard",
//     quantity: "20 Quintal",
//     price: 5200,
//     location: "RJ",
//     sellerName: "Demo Farmer",
//     date: "Today",
//     quality: "Standard",
//     rating: 4.0,
//     ratingCount: 6
//   }
// ];

// const Marketplace = ({ listings = [], user, onSendProposal }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({ state: "", crop: "" });
//   const [selectedListing, setSelectedListing] = useState(null);

//   /* ⭐ ratings stored locally (TEMP) */
//   const [ratings, setRatings] = useState({});

//   /* ---------------- MERGE LISTINGS ---------------- */
//   const allListings = useMemo(() => {
//     const dbListings = listings.map(l => ({
//       ...l,
//       rating: l.rating || 0,
//       ratingCount: l.ratingCount || 0
//     }));
//     return [...TEMP_LISTINGS, ...dbListings];
//   }, [listings]);

//   const uniqueCrops = [
//     ...new Set(allListings.map(l => l.commodity.split(" ")[0]))
//   ];

//   /* ---------------- FILTER ---------------- */
//   const filteredListings = allListings.filter(item => {
//     const matchesSearch =
//       item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.location.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCrop = filters.crop
//       ? item.commodity.includes(filters.crop)
//       : true;

//     const matchesState = filters.state
//       ? item.location.includes(filters.state)
//       : true;

//     return matchesSearch && matchesCrop && matchesState;
//   });

//   /* ---------------- RATE LISTING ---------------- */
//   const handleRate = (listingId, value) => {
//     setRatings(prev => ({
//       ...prev,
//       [listingId]: value
//     }));
//   };
  


//   return (
//     <div className="py-8 bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-4">

//         {/* FILTERS */}
//         {user?.role === "buyer" && (
//           <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
//             <h3 className="font-bold mb-4 flex items-center gap-2">
//               <Filter size={18} /> Filters
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="border rounded-lg p-2.5"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />

//               <select
//                 className="border rounded-lg p-2.5"
//                 onChange={e =>
//                   setFilters({ ...filters, crop: e.target.value })
//                 }
//               >
//                 <option value="">All Crops</option>
//                 {uniqueCrops.map(c => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 placeholder="State"
//                 className="border rounded-lg p-2.5"
//                 onChange={e =>
//                   setFilters({ ...filters, state: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//         )}

//         {/* LISTINGS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredListings.map(item => {
//             const userRating = ratings[item._id];

//             return (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-xl shadow-sm border flex flex-col"
//               >
//                 <div className="h-32 bg-green-50 flex items-center justify-center">
//                   <Wheat className="h-16 w-16 text-green-300" />
//                 </div>

//                 <div className="p-5 flex-grow">
//                   <h3 className="text-xl font-bold">{item.commodity}</h3>

//                   <div className="text-sm text-gray-600 space-y-1 mt-2">
//                     <div className="flex items-center">
//                       <BarChart3 size={14} className="mr-2" />
//                       {item.quantity}
//                     </div>
//                     <div className="flex items-center">
//                       <MapPin size={14} className="mr-2" />
//                       {item.location}
//                     </div>
//                     <div className="flex items-center">
//                       <User size={14} className="mr-2" />
//                       {item.sellerName}
//                     </div>
//                   </div>

//                   {/* PRICE */}
//                   <div className="mt-4 text-xl font-bold text-green-700">
//                     ₹{item.price}
//                   </div>

//                   {/* ⭐ RATING */}
//                   <div className="flex items-center gap-1 mt-3">
//                     {[1, 2, 3, 4, 5].map(n => (
//                       <Star
//                         key={n}
//                         size={18}
//                         className={`cursor-pointer ${
//                           (userRating || item.rating) >= n
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                         onClick={() => handleRate(item._id, n)}
//                       />
//                     ))}
//                     <span className="text-xs text-gray-500 ml-2">
//                       {userRating || item.rating} ★
//                     </span>
//                   </div>
//                 </div>

//                 {/* ACTION */}
//                 <div className="p-4 border-t">
//                   {user?.role === "buyer" ? (
//                     <button
//                       onClick={() => setSelectedListing(item)}
//                       className="w-full bg-green-600 text-white py-2 rounded-lg font-medium"
//                     >
//                       Make Offer
//                     </button>
//                   ) : (
//                     <span className="text-xs text-gray-400">
//                       Login as buyer to offer
//                     </span>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <ProposalModal
//   isOpen={!!selectedListing}
//   onClose={() => setSelectedListing(null)}
//   listing={selectedListing}
//   onSubmit={(proposalData) => {
//     if (!onSendProposal) {
//       console.warn("onSendProposal not provided");
//       return;
//     }

//     const finalProposal = {
//       ...proposalData,
//       listingId: selectedListing._id,
//       listing: selectedListing,
//       buyerId: user?.id,
//       buyerName: user?.name,
//       status: "pending",
//       createdAt: new Date().toISOString()
//     };

//     console.log("✅ Proposal sent from Marketplace:", finalProposal);

//     onSendProposal(finalProposal);
//     setSelectedListing(null);
//   }}
// />

//     </div>
//   );
// };

// export default Marketplace;
import React, { useState, useMemo } from "react";
import {
  Filter,
  BarChart3,
  MapPin,
  User,
  Wheat,
  Star
} from "lucide-react";
import ProposalModal from "./ProposalModal";



const Marketplace = ({ listings = [], user, onSendProposal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ state: "", crop: "" });
  const [selectedListing, setSelectedListing] = useState(null);

  /* ⭐ TEMP ratings (frontend-only for now) */
  const [ratings, setRatings] = useState({});

  /* ✅ USE ONLY DB LISTINGS */
  const allListings = useMemo(() => {
    return Array.isArray(listings) ? listings : [];
  }, [listings]);

  /* ✅ UNIQUE CROPS FROM DB */
  const uniqueCrops = useMemo(() => {
    return [
      ...new Set(
        allListings
          .filter(l => l?.commodity)
          .map(l => l.commodity.split(" ")[0])
      )
    ];
  }, [allListings]);

  /* ✅ FILTER DB LISTINGS */
  const filteredListings = allListings.filter(item => {
    if (!item) return false;

    const matchesSearch =
      item.commodity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCrop = filters.crop
      ? item.commodity?.includes(filters.crop)
      : true;

    const matchesState = filters.state
      ? item.location?.includes(filters.state)
      : true;

    return matchesSearch && matchesCrop && matchesState;
  });

  /* ⭐ RATE LISTING (TEMP ONLY) */
  const handleRate = (listingId, value) => {
    setRatings(prev => ({
      ...prev,
      [listingId]: value
    }));
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">

        {/* FILTERS */}
        {user?.role === "buyer" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-lg p-2.5"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />

              <select
                className="border rounded-lg p-2.5"
                onChange={e =>
                  setFilters({ ...filters, crop: e.target.value })
                }
              >
                <option value="">All Crops</option>
                {uniqueCrops.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="State"
                className="border rounded-lg p-2.5"
                onChange={e =>
                  setFilters({ ...filters, state: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* ✅ NO LISTINGS MESSAGE */}
        {filteredListings.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No crops available in the marketplace
          </div>
        )}

        {/* LISTINGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(item => {
            const userRating = ratings[item._id];

            return (
              <div
                key={item._id}   /* ✅ DB ID */
                className="bg-white rounded-xl shadow-sm border flex flex-col"
              >
                <div className="h-32 bg-green-50 flex items-center justify-center">
                  <Wheat className="h-16 w-16 text-green-300" />
                </div>

                <div className="p-5 grow">
                  <h3 className="text-xl font-bold">{item.commodity}</h3>

                  <div className="text-sm text-gray-600 space-y-1 mt-2">
                    <div className="flex items-center">
                      <BarChart3 size={14} className="mr-2" />
                      {item.quantity}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      {item.farmAddress}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-2" />
                      {item.farmerName}
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mt-4 text-xl font-bold text-green-700">
                    ₹{item.price}
                  </div>

                  {/* ⭐ RATING */}
                  <div className="flex items-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star
                        key={n}
                        size={18}
                        className={`cursor-pointer ${
                          (userRating || 0) >= n
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRate(item._id, n)}
                      />
                    ))}
                  </div>
                </div>

                {/* ACTION */}
                <div className="p-4 border-t">
                  {user?.role === "buyer" ? (
                    <button
                      onClick={() => setSelectedListing(item)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-medium"
                    >
                      Make Offer
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">
                      Login as buyer to offer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROPOSAL MODAL */}
      <ProposalModal
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        listing={selectedListing}
        onSubmit={(proposalData) => {
          const finalProposal = {
            ...proposalData,
            listingId: selectedListing._id,
            listing: selectedListing,
            buyerId: user?.id,
            buyerName: user?.name,
            status: "pending",
            createdAt: new Date().toISOString()
          };

          onSendProposal(finalProposal);
          setSelectedListing(null);
        }}
      />
    </div>
  );
};

export default Marketplace;

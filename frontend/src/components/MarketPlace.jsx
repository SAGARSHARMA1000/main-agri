
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

  // return (
  //    <div className="min-h-screen pt-32 md:pt-36
  //         bg-linear-to-br from-emerald-950 via-slate-900 to-emerald-950
  //          px-4 md:px-8">
  //     <div className="max-7xl mx-auto">

  //       {/* FILTERS */}
  //       {user?.role === "buyer" && (
  //         <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
  //           <h3 className="font-bold mb-4 flex items-center gap-2">
  //             <Filter size={18} /> Filters
  //           </h3>

  //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  //             <input
  //               type="text"
  //               placeholder="Search..."
  //               className="border rounded-lg p-2.5"
  //               value={searchTerm}
  //               onChange={e => setSearchTerm(e.target.value)}
  //             />

  //             <select
  //               className="border rounded-lg p-2.5"
  //               onChange={e =>
  //                 setFilters({ ...filters, crop: e.target.value })
  //               }
  //             >
  //               <option value="">All Crops</option>
  //               {uniqueCrops.map(c => (
  //                 <option key={c} value={c}>{c}</option>
  //               ))}
  //             </select>

  //             <input
  //               type="text"
  //               placeholder="State"
  //               className="border rounded-lg p-2.5"
  //               onChange={e =>
  //                 setFilters({ ...filters, state: e.target.value })
  //               }
  //             />
  //           </div>
  //         </div>
  //       )}

  //       {/* ✅ NO LISTINGS MESSAGE */}
  //       {filteredListings.length === 0 && (
  //         <div className="text-center text-gray-500 mt-20">
  //           No crops available in the marketplace
  //         </div>
  //       )}

  //       {/* LISTINGS */}
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {filteredListings.map(item => {
  //           const userRating = ratings[item._id];

  //           return (
  //             <div
  //               key={item._id}   /* ✅ DB ID */
  //               className="bg-white rounded-xl shadow-sm border flex flex-col"
  //             >
  //               <div className="h-32 bg-green-50 flex items-center justify-center">
  //                 <Wheat className="h-16 w-16 text-green-300" />
  //               </div>

  //               <div className="p-5 grow">
  //                 <h3 className="text-xl font-bold">{item.commodity}</h3>

  //                 <div className="text-sm text-gray-600 space-y-1 mt-2">
  //                   <div className="flex items-center">
  //                     <BarChart3 size={14} className="mr-2" />
  //                     {item.quantity}
  //                   </div>
  //                   <div className="flex items-center">
  //                     <MapPin size={14} className="mr-2" />
  //                     {item.farmAddress}
  //                   </div>
  //                   <div className="flex items-center">
  //                     <User size={14} className="mr-2" />
  //                     {item.farmerName}
  //                   </div>
  //                 </div>

  //                 {/* PRICE */}
  //                 <div className="mt-4 text-xl font-bold text-green-700">
  //                   ₹{item.price}
  //                 </div>

  //                 {/* ⭐ RATING */}
  //                 <div className="flex items-center gap-1 mt-3">
  //                   {[1, 2, 3, 4, 5].map(n => (
  //                     <Star
  //                       key={n}
  //                       size={18}
  //                       className={`cursor-pointer ${
  //                         (userRating || 0) >= n
  //                           ? "text-yellow-400"
  //                           : "text-gray-300"
  //                       }`}
  //                       onClick={() => handleRate(item._id, n)}
  //                     />
  //                   ))}
  //                 </div>
  //               </div>

  //               {/* ACTION */}
  //               <div className="p-4 border-t">
  //                 {user?.role === "buyer" ? (
  //                   <button
  //                     onClick={() => setSelectedListing(item)}
  //                     className="w-full bg-green-600 text-white py-2 rounded-lg font-medium"
  //                   >
  //                     Make Offer
  //                   </button>
  //                 ) : (
  //                   <span className="text-xs text-gray-400">
  //                     Login as buyer to offer
  //                   </span>
  //                 )}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>

  //     {/* PROPOSAL MODAL */}
  //     <ProposalModal
  //       isOpen={!!selectedListing}
  //       onClose={() => setSelectedListing(null)}
  //       listing={selectedListing}
  //       onSubmit={(proposalData) => {
  //         const finalProposal = {
  //           ...proposalData,
  //           listingId: selectedListing._id,
  //           listing: selectedListing,
  //           buyerId: user?.id,
  //           buyerName: user?.name,
  //           status: "pending",
  //           createdAt: new Date().toISOString()
  //         };

  //         onSendProposal(finalProposal);
  //         setSelectedListing(null);
  //       }}
  //     />
  //   </div>
  // );
return (
  <div className="min-h-screen pt-32 md:pt-36
    bg-linear-to-br from-emerald-950 via-slate-900 to-emerald-950
    px-4 md:px-8">

    <div className="max-w-7xl mx-auto">

      {/* FILTERS */}
      {user?.role === "buyer" && (
        <div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-md border mb-8">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Filter size={18} /> Filters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            <select
              className="border rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
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
              className="border rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              onChange={e =>
                setFilters({ ...filters, state: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {/* NO LISTINGS */}
      {filteredListings.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No crops available in the marketplace
        </div>
      )}

      {/* LISTINGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(item => {
          const userRating = ratings[item._id];

          return (
            <div
              key={item._id}
              className="group relative rounded-2xl overflow-hidden
              bg-linear-to-br from-[#0f172a] to-[#020617]
              border border-white/10 shadow-lg
              hover:shadow-green-500/20
              transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] flex flex-col"
            >

              {/* 🌾 IMAGE SECTION */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
                  alt="crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* ICON */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wheat className="h-12 w-12 text-white/70" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 text-white flex flex-col grow">

                <h3 className="text-lg md:text-xl font-semibold tracking-wide">
                  {item.commodity}
                </h3>

                <div className="text-sm text-gray-300 space-y-1 mt-3">

                  <div className="flex items-center">
                    <BarChart3 size={14} className="mr-2 text-green-400" />
                    {item.quantity}
                  </div>

                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 text-green-400" />
                    {item.farmAddress}
                  </div>

                  <div className="flex items-center">
                    <User size={14} className="mr-2 text-green-400" />
                    {item.farmerName}
                  </div>

                </div>

                {/* PRICE */}
                <div className="mt-4 text-xl font-bold text-green-400">
                  ₹{item.price}
                </div>

                {/* ⭐ RATING */}
                <div className="flex items-center gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map(n => (
                    <Star
                      key={n}
                      size={18}
                      className={`cursor-pointer transition ${
                        (userRating || 0) >= n
                          ? "text-yellow-400 scale-110"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleRate(item._id, n)}
                    />
                  ))}
                </div>
              </div>

              {/* ACTION */}
              <div className="p-4 border-t border-white/10">
                {user?.role === "buyer" ? (
                  <button
                    onClick={() => setSelectedListing(item)}
                    className="w-full bg-linear-to-r from-green-500 to-emerald-600
                    hover:from-green-400 hover:to-emerald-500
                    text-white py-2 rounded-lg font-medium
                    transition-all duration-300 shadow-md hover:shadow-green-500/30"
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

    {/* MODAL */}
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

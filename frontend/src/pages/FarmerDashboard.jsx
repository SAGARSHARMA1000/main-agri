// import React, { useState } from "react";
// import { ClipboardList, FileText, Bell, FileSignature, Download, PenTool } from "lucide-react";
// import ProcessTracker from "../components/ProcessTracker";

// const FarmerDashboard = ({ user, listings = [], proposals = [], onAddListing, onAcceptProposal, onSignContract }) => {
//   const [activeTab, setActiveTab] = useState('listings');
//   const myListings = listings.filter(l => l.sellerId === user.id);
//   const pendingProposals = proposals.filter(p => p.listing?.sellerId === user.id && p.status === 'pending');
//   const activeContracts = proposals.filter(p => p.listing?.sellerId === user.id && p.status !== 'pending' && p.status !== 'rejected');

//   const [formData, setFormData] = useState({ commodity: '', quantity: '', price: '', location: user.location, quality: 'Standard' });

//   const handleAdd = (e) => {
//     e.preventDefault();
//     onAddListing({ ...formData, id: Date.now(), seller: user.name, sellerId: user.id, date: new Date().toLocaleDateString() });
//     setFormData({ commodity: '', quantity: '', price: '', location: user.location, quality: 'Standard' });
//     setActiveTab('listings');
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">
//       <div className="bg-green-800 text-white p-8">
//         <div className="container mx-auto">
//           <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
//           <p className="opacity-90">Welcome back, {user.name}</p>
//           <div className="flex gap-4 mt-6">
//             <div className="bg-green-700/50 p-4 rounded-lg backdrop-blur-sm">
//               <span className="block text-2xl font-bold">{myListings.length}</span>
//               <span className="text-sm opacity-80">Active Listings</span>
//             </div>
//             <div className="bg-green-700/50 p-4 rounded-lg backdrop-blur-sm">
//               <span className="block text-2xl font-bold">{pendingProposals.length}</span>
//               <span className="text-sm opacity-80">New Proposals</span>
//             </div>
//             <div className="bg-green-700/50 p-4 rounded-lg backdrop-blur-sm">
//               <span className="block text-2xl font-bold">{activeContracts.length}</span>
//               <span className="text-sm opacity-80">Active Contracts</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 -mt-6">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[500px] flex flex-col md:flex-row">
//           <div className="w-full md:w-64 bg-gray-50 border-r p-4 space-y-2">
//             <button onClick={() => setActiveTab('listings')} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'listings' ? 'bg-green-100 text-green-800 font-bold' : 'hover:bg-gray-100'}`}>
//               <ClipboardList size={18} /> My Listings
//             </button>
//             <button onClick={() => setActiveTab('add')} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'add' ? 'bg-green-100 text-green-800 font-bold' : 'hover:bg-gray-100'}`}>
//               <FileText size={18} /> Add Listing
//             </button>
//             <button onClick={() => setActiveTab('proposals')} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'proposals' ? 'bg-green-100 text-green-800 font-bold' : 'hover:bg-gray-100'}`}>
//               <Bell size={18} /> Proposals <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingProposals.length}</span>
//             </button>
//             <button onClick={() => setActiveTab('contracts')} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${activeTab === 'contracts' ? 'bg-green-100 text-green-800 font-bold' : 'hover:bg-gray-100'}`}>
//               <FileSignature size={18} /> Contracts & Payments
//             </button>
//           </div>

//           <div className="flex-1 p-6">
//             {activeTab === 'listings' && (
//               <div>
//                 <h3 className="text-xl font-bold mb-4">Your Active Listings</h3>
//                 <div className="grid gap-4">
//                   {myListings.map(l => (
//                     <div key={l.id} className="border p-4 rounded-lg flex justify-between items-center bg-white hover:shadow-sm">
//                       <div>
//                         <h4 className="font-bold">{l.commodity}</h4>
//                         <p className="text-sm text-gray-500">{l.quantity} • ₹{l.price}</p>
//                       </div>
//                       <span className="text-green-600 text-sm font-medium">Live</span>
//                     </div>
//                   ))}
//                   {myListings.length === 0 && <p className="text-gray-500">No active listings.</p>}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'add' && (
//               <div className="max-w-xl">
//                  <h3 className="text-xl font-bold mb-4">Add New Crop Listing</h3>
//                  <form onSubmit={handleAdd} className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <select required className="border p-3 rounded bg-white" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})}>
//                         <option value="">Select Crop</option>
//                         <option value="Wheat">Wheat</option>
//                         <option value="Rice">Rice</option>
//                         <option value="Soybean">Soybean</option>
//                       </select>
//                       <select className="border p-3 rounded bg-white" value={formData.quality} onChange={e => setFormData({...formData, quality: e.target.value})}>
//                         <option value="Standard">Standard</option>
//                         <option value="Premium">Grade A</option>
//                       </select>
//                     </div>
//                     <input required placeholder="Quantity (e.g. 50 Quintal)" className="w-full border p-3 rounded" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
//                     <input required placeholder="Price per unit (₹)" type="number" className="w-full border p-3 rounded" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
//                     <input required placeholder="Location" className="w-full border p-3 rounded" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
//                     <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded font-bold w-full hover:bg-green-700">Publish to Marketplace</button>
//                  </form>
//               </div>
//             )}

//             {activeTab === 'proposals' && (
//               <div>
//                 <h3 className="text-xl font-bold mb-4">Negotiations & Proposals</h3>
//                 <div className="space-y-4">
//                   {pendingProposals.map(p => (
//                     <div key={p.id} className="border border-yellow-200 bg-yellow-50 p-5 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-bold text-lg">{p.buyerName} wants to buy {p.commodity}</h4>
//                           <p className="text-sm text-gray-600 mt-1">Offer: <span className="font-bold text-black">₹{p.price}/Qtl</span> for {p.quantity}</p>
//                           <p className="text-sm text-gray-600">Pickup Date: {p.date}</p>
//                         </div>
//                         <div className="flex gap-2">
//                           <button onClick={() => onAcceptProposal(p.id)} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700">Accept Offer</button>
//                           <button className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm font-bold hover:bg-red-200">Decline</button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {pendingProposals.length === 0 && <p className="text-gray-500">No pending proposals.</p>}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'contracts' && (
//               <div>
//                 <h3 className="text-xl font-bold mb-4">Contract Management & Escrow</h3>
//                 <div className="space-y-4">
//                   {activeContracts.map(p => (
//                     <div key={p.id} className="border border-gray-200 bg-white p-5 rounded-lg shadow-sm">
//                        <div className="flex justify-between items-start mb-2">
//                          <div>
//                             <h4 className="font-bold text-gray-800 text-lg">{p.commodity} Contract #{p.id}</h4>
//                             <p className="text-sm text-gray-600">Buyer: {p.buyerName} | Date: {p.date}</p>
//                          </div>
//                          <div className="flex gap-2">
//                             {!p.signatures?.farmer && (
//                               <button 
//                                 onClick={() => onSignContract(p)}
//                                 className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-blue-700 flex items-center gap-2"
//                               >
//                                 <PenTool size={14}/> Sign Contract
//                               </button>
//                             )}
//                             <button className="text-gray-500 text-sm font-bold flex items-center gap-1 hover:underline border px-3 rounded">
//                               <Download size={14}/> PDF
//                             </button>
//                          </div>
//                        </div>
                       
//                        <ProcessTracker status={p.status} signatures={p.signatures} />
//                     </div>
//                   ))}
//                   {activeContracts.length === 0 && <p className="text-gray-500">No active contracts.</p>}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;
//2

// import React, { useState } from "react";
// import {
//   ClipboardList,
//   FileText,
//   Bell,
//   FileSignature,
//   Download,
//   PenTool
// } from "lucide-react";
// import ProcessTracker from "../components/ProcessTracker";

// const FarmerDashboard = ({
//   user,
//   listings = [],
//   proposals = [],
//   onAddListing,
//   onAcceptProposal,
//   onSignContract
// }) => {

//   // ✅ HARD SAFETY GUARD
//   if (!user || !user.id) {
//     return <div className="p-6 text-center">Loading Farmer Dashboard...</div>;
//   }

//   const [activeTab, setActiveTab] = useState("listings");

//   // ✅ SAFE FILTERS
//   const myListings = Array.isArray(listings)
//   ? listings.filter(l => l?.sellerId === user?.id)
//   : [];


//   const pendingProposals = Array.isArray(proposals)
//   ? proposals.filter(
//       p =>
//         p?.listing?.sellerId === user?.id &&
//         p?.status === "pending"
//     )
//   : [];
// const activeContracts = Array.isArray(proposals)
//   ? proposals.filter(
//       p =>
//         p?.listing?.sellerId === user?.id &&
//         p?.status !== "pending" &&
//         p?.status !== "rejected"
//     )
//   : [];


//   const [formData, setFormData] = useState({
//     commodity: "",
//     quantity: "",
//     price: "",
//     location: user.location || "",
//     quality: "Standard"
//   });

//   const handleAdd = (e) => {
//     e.preventDefault();

//     onAddListing({
//       ...formData,
//       id: Date.now(),
//       seller: user.name,
//       sellerId: user.id,
//       date: new Date().toLocaleDateString()
//     });

//     setFormData({
//       commodity: "",
//       quantity: "",
//       price: "",
//       location: user.location || "",
//       quality: "Standard"
//     });

//     setActiveTab("listings");
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">
//       {/* HEADER */}
//       <div className="bg-green-800 text-white p-8">
//         <div className="container mx-auto">
//           <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
//           <p className="opacity-90">Welcome back, {user.name}</p>

//           <div className="flex gap-4 mt-6">
//             <div className="bg-green-700/50 p-4 rounded-lg">
//               <span className="block text-2xl font-bold">
//                 {myListings.length}
//               </span>
//               <span className="text-sm opacity-80">Active Listings</span>
//             </div>

//             <div className="bg-green-700/50 p-4 rounded-lg">
//               <span className="block text-2xl font-bold">
//                 {pendingProposals.length}
//               </span>
//               <span className="text-sm opacity-80">New Proposals</span>
//             </div>

//             <div className="bg-green-700/50 p-4 rounded-lg">
//               <span className="block text-2xl font-bold">
//                 {activeContracts.length}
//               </span>
//               <span className="text-sm opacity-80">Active Contracts</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="container mx-auto px-4 -mt-6">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[500px] flex">

//           {/* SIDEBAR */}
//           <div className="w-64 bg-gray-50 border-r p-4 space-y-2">
//             <button onClick={() => setActiveTab("listings")}
//               className={`w-full p-3 rounded-lg flex gap-3 ${
//                 activeTab === "listings"
//                   ? "bg-green-100 text-green-800 font-bold"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <ClipboardList size={18} /> My Listings
//             </button>

//             <button onClick={() => setActiveTab("add")}
//               className={`w-full p-3 rounded-lg flex gap-3 ${
//                 activeTab === "add"
//                   ? "bg-green-100 text-green-800 font-bold"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <FileText size={18} /> Add Listing
//             </button>

//             <button onClick={() => setActiveTab("proposals")}
//               className={`w-full p-3 rounded-lg flex gap-3 ${
//                 activeTab === "proposals"
//                   ? "bg-green-100 text-green-800 font-bold"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Bell size={18} /> Proposals
//               <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">
//                 {pendingProposals.length}
//               </span>
//             </button>

//             <button onClick={() => setActiveTab("contracts")}
//               className={`w-full p-3 rounded-lg flex gap-3 ${
//                 activeTab === "contracts"
//                   ? "bg-green-100 text-green-800 font-bold"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <FileSignature size={18} /> Contracts
//             </button>
//           </div>

//           {/* MAIN */}
//           <div className="flex-1 p-6">
//             {activeTab === "add" && (
//               <form onSubmit={handleAdd} className="space-y-4 max-w-xl">
//                 <h3 className="text-xl font-bold">Add New Crop Listing</h3>

//                 <input
//                   required
//                   placeholder="Commodity"
//                   className="w-full border p-3 rounded"
//                   value={formData.commodity}
//                   onChange={(e) =>
//                     setFormData({ ...formData, commodity: e.target.value })
//                   }
//                 />

//                 <input
//                   required
//                   placeholder="Quantity"
//                   className="w-full border p-3 rounded"
//                   value={formData.quantity}
//                   onChange={(e) =>
//                     setFormData({ ...formData, quantity: e.target.value })
//                   }
//                 />

//                 <input
//                   required
//                   type="number"
//                   placeholder="Price"
//                   className="w-full border p-3 rounded"
//                   value={formData.price}
//                   onChange={(e) =>
//                     setFormData({ ...formData, price: e.target.value })
//                   }
//                 />

//                 <button className="bg-green-600 text-white px-6 py-3 rounded font-bold">
//                   Publish Listing
//                 </button>
//               </form>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;
// import React, { useEffect, useState } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import {
//   ClipboardList,
//   FileText,
//   Bell,
//   FileSignature
// } from "lucide-react";

// import FarmerProposalCard from "../sections/farmerSection/FarmerProposalCard";
// import api from "../services/api";


// const FarmerDashboard = ({ user }) => {
//   const location = useLocation();
//   const [proposals, setProposals] = useState([]);

//   // 🔒 SAFETY GUARD
//   if (!user || !user.id) {
//     return <div className="p-6 text-center">Loading Farmer Dashboard...</div>;
//   }

//   // 🔁 Fetch farmer proposals
//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const res = await api.getFarmerProposals(user.name);
//         setProposals(res.data || []);
//       } catch (err) {
//         console.error("Failed to load proposals", err);
//       }
//       finally {
//        // setLoading(false);
//       }
//     };

//     fetchProposals();
//   }, [user.name]);

//   // ✅ Accept proposal
//   const handleAccept = async (proposalId) => {
//     await api.updateProposalStatus(proposalId, "accepted");
//     setProposals((prev) =>
//       prev.map((p) =>
//         p._id === proposalId ? { ...p, status: "accepted" } : p
//       )
//     );
//   };

//   // ❌ Reject proposal
//   const handleReject = async (proposalId) => {
//     await api.updateProposalStatus(proposalId, "rejected");
//     setProposals((prev) =>
//       prev.map((p) =>
//         p._id === proposalId ? { ...p, status: "rejected" } : p
//       )
//     );
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">

//       {/* HEADER */}
//       <div className="bg-green-800 text-white p-8">
//         <div className="container mx-auto">
//           <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
//           <p className="opacity-90">Welcome back, {user.name}</p>
//           {/* <div className="flex gap-4 mt-6">
//             <div className="bg-green-700/50 p-4 rounded-lg backdrop-blur-sm">
//               <span className="block text-2xl font-bold">{myListings.length}</span>
//               <span className="text-sm opacity-80">Active Listings</span>
//             </div>
//             <div className="bg-green-700/50 p-4 rounded-lg backdrop-blur-sm">
//               <span className="block text-2xl font-bold">{pendingProposals.length}</span>
//               <span className="text-sm opacity-80">New Proposals</span>
//             </div>
//             <div className="bg-green-700/50 p-4 rounded-lg backdrop-blur-sm">
//               <span className="block text-2xl font-bold">{activeContracts.length}</span>
//               <span className="text-sm opacity-80">Active Contracts</span>
//             </div> */}
//           {/* </div> */}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="container mx-auto px-4 -mt-6">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px] flex">

//           {/* SIDEBAR */}
//           <div className="w-64 bg-gray-50 border-r p-4 space-y-2">

//             <NavLink to="listings" className={({ isActive }) =>
//               `w-full p-3 rounded-lg flex gap-3 ${
//                 isActive ? "bg-green-100 text-green-800 font-bold" : "hover:bg-gray-100"
//               }`
//             }>
//               <ClipboardList size={18} /> My Listings
//             </NavLink>

//             <NavLink to="add" className={({ isActive }) =>
//               `w-full p-3 rounded-lg flex gap-3 ${
//                 isActive ? "bg-green-100 text-green-800 font-bold" : "hover:bg-gray-100"
//               }`
//             }>
//               <FileText size={18} /> Add Listing
//             </NavLink>

//             <NavLink to="proposals" className={({ isActive }) =>
//               `w-full p-3 rounded-lg flex gap-3 ${
//                 isActive ? "bg-green-100 text-green-800 font-bold" : "hover:bg-gray-100"
//               }`
//             }>
//               <Bell size={18} /> Proposals
//               {/* {!loading && (
//                 <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">
//                   {proposals.length}
//                 </span>
//               )} */}
//             </NavLink>

//             <NavLink to="contracts" className={({ isActive }) =>
//               `w-full p-3 rounded-lg flex gap-3 ${
//                 isActive ? "bg-green-100 text-green-800 font-bold" : "hover:bg-gray-100"
//               }`
//             }>
//               <FileSignature size={18} /> Contracts
//             </NavLink>
//           </div>

//           {/* MAIN */}
//           <div className="flex-1 p-6">

//             {/* PROPOSALS PAGE */}
//             {location.pathname.includes("proposals") ? (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold mb-4">Buyer Proposals</h2>

//                 {proposals.length === 0 ? (
//                   <p className="text-gray-500">No proposals received yet.</p>
//                 ) : (
//                   proposals.map((p) => (
//                     <FarmerProposalCard
//                       key={p._id}
//                       proposal={p}
//                       onAccept={handleAccept}
//                       onReject={handleReject}
//                     />
//                   ))
//                 )}
//               </div>
//             ) : (
//               <Outlet context={{ proposals, handleAccept, handleReject }} />
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;

import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ClipboardList,
  FileText,
  Bell,
  FileSignature
} from "lucide-react";

import FarmerProposalCard from "../sections/farmerSection/FarmerProposalCard";
import api from "../services/api";

const FarmerDashboard = ({ user, proposals, onUpdateProposalStatus,refreshMarketplace }) => {
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const farmerId = user?.id; // or demo user id

  const fetchListings = async () => {
  console.log("[FarmerDashboard] fetchListings called");
  console.log("[FarmerDashboard] user:", user);
  console.log("[FarmerDashboard] farmerId:", farmerId);
    try {
       if (!farmerId) return; // ✅ guard
      const resp = await api.getFarmerListings(farmerId);
       console.log("[FarmerDashboard] API response:", resp);
      setListings(resp.data.data);
    } catch (err) {
      console.error("Fetch listings failed", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [farmerId]);
    // ✅ LISTEN FOR CREATE REDIRECT
  useEffect(() => {
    if (location.state?.refresh) {
      fetchListings();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  // ✅ proposals MUST ALWAYS be an array
 // const [proposals, setProposals] = useState([]);
 const [pendingContracts, setPendingContracts] = useState(0);

  useEffect(() => {
    if (!user?.id) return;

    const fetchContracts = async () => {
      try {
        const res = await api.getFarmerContracts(user.id);
        const pending = res.data.filter(
          c => c.status === "sent_to_farmer"
        );
        setPendingContracts(pending.length);
      } catch (err) {
        console.error("❌ Failed to fetch farmer contracts", err);
      }
    };

    fetchContracts();
  }, [user]);

  // 🔒 SAFETY GUARD
  if (!user || !user.id) {
    return <div className="p-6 text-center">Loading Farmer Dashboard...</div>;
  }

  // ------------------------------------------------------------------
 
  // ✅ ACCEPT
const handleAccept = async (proposalId) => {
  try {
    console.log("✅ Accept clicked:", proposalId);
    await onUpdateProposalStatus(proposalId, "accepted");
    await api.acceptProposal(proposalId); // creates contract
  } catch (err) {
    console.error("Accept failed", err);
  }
};

// ❌ REJECT
const handleReject = async (proposalId) => {
  try {
    console.log("❌ Reject clicked:", proposalId);
    await onUpdateProposalStatus(proposalId, "rejected");
  } catch (err) {
    console.error("Reject failed", err);
  }
};


  return (
    // <div className="bg-gray-50 min-h-screen pb-12">
     <div className="bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-950
 min-h-screen pb-12">

      {/* ================= HEADER ================= */}
      {/* <div className="bg-green-800 text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="opacity-90">Welcome back, {user.name}</p>
        </div>

      </div> */}
       {/* ================= HEADER ================= */}
{/* <div className="bg-green-800 text-white pt-28 md:pt-32 pb-8"> */}
<div className=" text-white pt-28 md:pt-32 pb-8">
  <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
    <h1 className="text-3xl md:text-4xl font-bold mb-2">
      Farmer Dashboard
    </h1>
    <p className="opacity-90 text-base md:text-lg">
      Welcome back, {user.name}
    </p>
  </div>
</div>

      {/* ================= CONTENT ================= */}
      <div className="container text-2xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px] flex">

          {/* ================= SIDEBAR ================= */}
          <div className="w-64 bg-gray-50 border-r p-4 space-y-2">

            <NavLink
              to="listings"
              className={({ isActive }) =>
                `w-full p-3 rounded-lg flex gap-3 ${
                  isActive
                    ? "bg-green-100 text-green-800 font-bold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <ClipboardList size={23} /> My Listings
            </NavLink>

            <NavLink
              to="add"
              className={({ isActive }) =>
                `w-full p-3 rounded-lg flex gap-3 ${
                  isActive
                    ? "bg-green-100 text-green-800 font-bold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <FileText size={23} /> Add Listing
            </NavLink>

            <NavLink
              to="proposals"
              className={({ isActive }) =>
                `w-full p-3 rounded-lg flex gap-3 ${
                  isActive
                    ? "bg-green-100 text-green-800 font-bold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Bell size={23} /> Proposals
            </NavLink>

            <NavLink
              to="contracts"
              className={({ isActive }) =>
                `w-full p-3 rounded-lg flex gap-3 ${
                  isActive
                    ? "bg-green-100 text-green-800 font-bold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <FileSignature size={23} /> Contracts
              {pendingContracts > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 rounded-full">
              {pendingContracts}
            </span>
          )}
            </NavLink>
            <NavLink
              to="payments"
              className={({ isActive }) =>
                `w-full p-3 rounded-lg flex gap-3 ${
                  isActive
                    ? "bg-green-100 text-green-800 font-bold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <FileSignature size={23} /> Payments
              {pendingContracts > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 rounded-full">
              {pendingContracts}
            </span>
          )}
            </NavLink>
            <NavLink
              to="delivery"
              className={({ isActive }) =>
                `w-full p-3 rounded-lg flex gap-3 ${
                  isActive
                    ? "bg-green-100 text-green-800 font-bold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <FileSignature size={23} /> Delivery
              {pendingContracts > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 rounded-full">
              {pendingContracts}
            </span>
          )}
            </NavLink>

          </div>

          {/* ================= MAIN ================= */}
          <div className="flex-1 p-6">

            {/* ================= PROPOSALS PAGE ================= */}
            {location.pathname.includes("proposals") ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Buyer Proposals</h2>

                {/* ✅ SAFE RENDERING */}
                {Array.isArray(proposals) && proposals.length === 0 ? (
                  <p className="text-gray-500">
                    No proposals received yet.
                  </p>
                ) : (
                  Array.isArray(proposals) &&
                  proposals.map((p) => (
                    <FarmerProposalCard
                      key={p._id}
                      proposal={p}
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))
                )}
              </div>
            ) : (
              // Other nested routes
              <Outlet context={{ listings,fetchListings,user, refreshMarketplace,
              proposals, handleAccept, handleReject }} />
                            
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;


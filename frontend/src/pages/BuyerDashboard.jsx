// import React, { useState } from "react";
// import { ClipboardList, BarChart3, FileSignature, Lock, CheckCircle } from "lucide-react";
// import ProcessTracker from "../components/ProcessTracker";

// const BuyerDashboard = ({ user, proposals = [], onSignContract, onOpenPayment }) => {
//   const [activeTab, setActiveTab] = useState('orders');
//   const myContracts = proposals.filter(p => p.buyerId === user.id);

//   return (
//     <div className="bg-gray-50 min-h-screen p-8">
//       <div className="container mx-auto">
//         <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
//         <p className="text-gray-600 mb-6">Manage procurement, digital contracts, and escrow payments.</p>
        
//         <div className="flex gap-6 items-start">
//            <div className="w-64 bg-white rounded-xl shadow-sm p-4 space-y-2">
//              <button onClick={() => setActiveTab('orders')} className={`w-full text-left p-3 rounded flex items-center gap-2 ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-50'}`}>
//                <ClipboardList size={18}/> Orders & Proposals
//              </button>
//              <button onClick={() => setActiveTab('analytics')} className={`w-full text-left p-3 rounded flex items-center gap-2 ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-50'}`}>
//                <BarChart3 size={18}/> Market Analytics
//              </button>
//            </div>

//            <div className="flex-1 bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
//              {activeTab === 'orders' && (
//                <div>
//                   <h2 className="text-xl font-bold mb-6">My Orders</h2>
//                   <div className="space-y-4">
//                     {myContracts.map(p => (
//                       <div key={p.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-200 transition">
//                         <div className="flex justify-between items-start mb-3">
//                           <div>
//                             <span className="font-bold text-lg">{p.commodity}</span>
//                             <div className="flex gap-2 mt-1">
//                                <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
//                                  p.status === 'accepted' ? 'bg-yellow-100 text-yellow-800' :
//                                  p.status === 'escrow_funded' ? 'bg-green-100 text-green-800' : 
//                                  'bg-gray-100 text-gray-800'
//                                }`}>
//                                  {p.status === 'pending' ? 'Proposal Sent' : p.status === 'accepted' ? 'Contract Drafting' : 'Escrow Funded'}
//                                </span>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                              <p className="font-bold text-xl">₹{p.price}</p>
//                              <p className="text-xs text-gray-500">per Quintal</p>
//                           </div>
//                         </div>

//                         {p.status !== 'pending' && (
//                            <ProcessTracker status={p.status} signatures={p.signatures} />
//                         )}

//                         <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between mt-4">
//                            <div>
//                              <p className="text-sm font-medium">Seller: {p.listing.seller}</p>
//                              <p className="text-xs text-gray-500">Qty: {p.quantity}</p>
//                            </div>
                           
//                            {p.status === 'accepted' && (
//                              <div className="flex gap-2">
//                                {!p.signatures?.buyer && (
//                                  <button 
//                                    onClick={() => onSignContract(p)}
//                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 flex items-center gap-2"
//                                  >
//                                    <FileSignature size={16}/> Sign Contract
//                                  </button>
//                                )}
                               
//                                {p.signatures?.buyer && p.signatures?.farmer && (
//                                  <button 
//                                    onClick={() => onOpenPayment(p)}
//                                    className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700 flex items-center gap-2"
//                                  >
//                                    <Lock size={16}/> Deposit Escrow
//                                  </button>
//                                )}
//                              </div>
//                            )}

//                            {p.status === 'escrow_funded' && (
//                              <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
//                                <CheckCircle size={18}/> Funds in Escrow. Waiting for Delivery.
//                              </div>
//                            )}
//                         </div>
//                       </div>
//                     ))}
//                     {myContracts.length === 0 && <p className="text-gray-500 text-sm">No orders yet.</p>}
//                   </div>
//                </div>
//              )}
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyerDashboard;
// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import {
//   ClipboardList,
//   BarChart3,
//   FileSignature,
//   Lock
// } from "lucide-react";

// const BuyerDashboard = ({ user }) => {
//   // 🔒 SAFETY GUARD
//   if (!user || !user.id) {
//     return <div className="p-6 text-center">Loading Buyer Dashboard...</div>;
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">

//       {/* HEADER */}
//       <div className="bg-green-800 text-white p-8">
//         <div className="container mx-auto">
//           <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
//           <p className="opacity-90">
//             Manage procurement, contracts, and escrow payments
//           </p>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="container mx-auto px-4 -mt-6">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px] flex">

//           {/* SIDEBAR */}
//           <div className="w-64 bg-gray-50 border-r p-4 space-y-2">

//             <NavLink
//               to="/dashboard/buyer/orders"
//               className={({ isActive }) =>
//                 `w-full p-3 rounded-lg flex gap-3 items-center ${
//                   isActive
//                     ? "bg-green-100 text-green-800 font-bold"
//                     : "hover:bg-gray-100"
//                 }`
//               }
//             >
//               <ClipboardList size={18} /> Orders & Proposals
//             </NavLink>

//             <NavLink
//               to="/dashboard/buyer/contracts"
//               className={({ isActive }) =>
//                 `w-full p-3 rounded-lg flex gap-3 items-center ${
//                   isActive
//                     ? "bg-green-100 text-green-800 font-bold"
//                     : "hover:bg-gray-100"
//                 }`
//               }
//             >
//               <FileSignature size={18} /> Contracts & Drafting
//             </NavLink>

//             <NavLink
//               to="/dashboard/buyer/payments"
//               className={({ isActive }) =>
//                 `w-full p-3 rounded-lg flex gap-3 items-center ${
//                   isActive
//                     ? "bg-green-100 text-green-800 font-bold"
//                     : "hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Lock size={18} /> Escrow Payments
//             </NavLink>

//             <NavLink
//               to="/dashboard/buyer/analytics"
//               className={({ isActive }) =>
//                 `w-full p-3 rounded-lg flex gap-3 items-center ${
//                   isActive
//                     ? "bg-green-100 text-green-800 font-bold"
//                     : "hover:bg-gray-100"
//                 }`
//               }
//             >
//               <BarChart3 size={18} /> Market Analytics
//             </NavLink>

//           </div>

//           {/* MAIN CONTENT (ROUTE OUTLET) */}
//           <div className="flex-1 p-6">
//             <Outlet />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyerDashboard;
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  ClipboardList,
  BarChart3,
  FileSignature,
  Lock
} from "lucide-react";

const BuyerDashboard = ({ user, proposals }) => {
  // 🔒 SAFETY GUARD
  if (!user || !user.id) {
    return <div className="p-6 text-center">Loading Buyer Dashboard...</div>;
  }

  // ✅ UPDATED: log to verify re-render
  console.log("🔁 BuyerDashboard rendered");
  console.log("📦 BuyerDashboard proposals:", proposals);

  return (
    // <div className="bg-gray-50 min-h-screen pb-12">
<div className="bg-linear-to-br from-teal-950 via-teal-900 to-teal-950

 min-h-screen pb-12">
      {/* HEADER */}
      {/* <div className="bg-green-800 text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
          <p className="opacity-90">
            Manage procurement, contracts, and escrow payments
          </p>
        </div>
      </div> */}
      {/* <div className="bg-green-800 text-white pt-28 md:pt-32 pb-8"> */}
      <div className=" text-white pt-28 md:pt-32 pb-8">
  <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
    <h1 className=" text-3xl md:text-4xl font-bold mb-2">
      Buyer Dashboard
    </h1>
    <p className="opacity-90 text-base md:text-lg">
      Welcome back, {user.name}
    </p>
  </div>
</div>

      {/* CONTENT */}
      <div className="container text-xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px] flex">

          {/* SIDEBAR */}
          <div className="w-72 bg-gray-50 border-r p-4 space-y-2">

            <NavLink to="/dashboard/buyer/orders" className={({ isActive }) =>
              `w-full p-3 rounded-lg flex gap-3 items-center ${
                isActive
                  ? "bg-green-100 text-green-800 font-bold"
                  : "hover:bg-gray-100"
              }`
            }>
              <ClipboardList size={23} /> Orders & Proposals
            </NavLink>

            <NavLink to={"/dashboard/buyer/contracts"} className={({ isActive }) =>
              `w-full p-3 rounded-lg flex gap-3 items-center ${
                isActive
                  ? "bg-green-100 text-green-800 font-bold"
                  : "hover:bg-gray-100"
              }`
            }>
              <FileSignature size={23} /> Contracts & Drafting
            </NavLink>

            <NavLink to="/dashboard/buyer/payments" className={({ isActive }) =>
              `w-full p-3 rounded-lg flex gap-3 items-center ${
                isActive
                  ? "bg-green-100 text-green-800 font-bold"
                  : "hover:bg-gray-100"
              }`
            }>
              <Lock size={23} /> Escrow Payments
            </NavLink>

            <NavLink to="/dashboard/buyer/analytics" className={({ isActive }) =>
              `w-full p-3 rounded-lg flex gap-3 items-center ${
                isActive
                  ? "bg-green-100 text-green-800 font-bold"
                  : "hover:bg-gray-100"
              }`
            }>
              <BarChart3 size={23} /> Market Analytics
            </NavLink>

            <NavLink to="/dashboard/buyer/delivery" className={({ isActive }) =>
              `w-full p-3 rounded-lg flex gap-3 items-center ${
                isActive
                  ? "bg-green-100 text-green-800 font-bold"
                  : "hover:bg-gray-100"
              }`
            }>
              <BarChart3 size={23} /> Delivery
            </NavLink>

          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 p-6">
            {/* ✅ UPDATED: pass data via Outlet context */}
            <Outlet context={{ proposals, user }} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

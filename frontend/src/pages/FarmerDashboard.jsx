

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
      <div className="container text-xl mx-auto px-4 -mt-6">
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


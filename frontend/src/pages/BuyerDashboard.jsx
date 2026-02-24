
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

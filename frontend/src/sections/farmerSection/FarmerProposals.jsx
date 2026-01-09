import React from "react";
import { useOutletContext } from "react-router-dom";
import FarmerProposalCard from "./FarmerProposalCard";

const FarmerProposals = () => {
  /* 🔁 Get data from FarmerDashboard <Outlet context /> */
  const { proposals, handleAccept, handleReject } = useOutletContext();
  console.log("🧾 Proposals in FarmerProposals:", proposals); // LOG 8
  if (!proposals || proposals.length === 0) {
    return (
      <div className="text-gray-500 text-xl">
        No proposals yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <FarmerProposalCard
          key={proposal._id}   /* ✅ FIXED KEY */
          proposal={proposal}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default FarmerProposals;

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  CheckCircle,
  AlertTriangle,
  Truck,
  Clock
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

/* ---------- STATUS LABELS ---------- */
const STATUS_LABELS = {
  PICKUP_SCHEDULED: "Pickup Scheduled",
  COLLECTED_FROM_FARMER: "Collected",
  IN_TRANSIT: "In Transit",
  DELIVERED_TO_BUYER: "Delivered",
  CONFIRMED_BY_BUYER: "Confirmed",
  AUTO_CONFIRMED: "Auto Confirmed",
  ESCROW_RELEASED: "Payment Released",
  ISSUE_REPORTED: "Issue Reported"
};

export default function BuyerDeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  //const buyerId = localStorage.getItem("userId");
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useOutletContext();
  const [issueText, setIssueText] = useState("");



  const fetchDeliveries = async () => {
    try {
      const res = await api.getBuyerDeliveries(user.id);
      setDeliveries(res.data);
    } catch (err) {
      console.error("❌ Failed to load deliveries", err);
    }
  };
useEffect(() => {
  if (user?.id){fetchDeliveries();}
}, [user?.id]);


  
const confirmDelivery = async (deliveryId) => {
  try {
    setActionLoading(true);
    setError("");

    await api.confirmBuyerDelivery(deliveryId);

    // refresh deliveries
    //await fetchData();
    await fetchDeliveries();
  } catch (err) {
    console.error("❌ Confirm delivery failed", err);
    setError("Failed to confirm delivery. Please try again.");
  } finally {
    setActionLoading(false);
  }
};
const reportIssue = async (deliveryId, description) => {
  if (!description || description.trim().length < 5) {
    setError("Please provide a valid issue description.");
    return;
  }

  try {
    setActionLoading(true);
    setError("");

    await api.reportBuyerIssue(deliveryId, description);

    await fetchDeliveries();
  } catch (err) {
    console.error("❌ Report issue failed", err);
    setError("Failed to report issue. Please try again.");
  } finally {
    setActionLoading(false);
  }
};


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Delivery Confirmation</h1>

      <div className="space-y-4">
        {deliveries.map(d => (
          <div key={d._id} className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                {STATUS_LABELS[d.deliveryStatus]}
              </span>
              <span className="text-xs text-gray-400">{d.deliveryId}</span>
            </div>

            <h3 className="font-bold">{d.crop}</h3>
            <p className="text-sm text-gray-500">{d.quantity}</p>

            {d.deliveryStatus === "DELIVERED_TO_BUYER" && (
              <div className="mt-4 flex gap-3">
                <button
                  disabled={actionLoading}
                  onClick={() => confirmDelivery(d._id)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                 {actionLoading ? "Confirming..." : "Confirm Delivery"}
                </button>
                <textarea
  placeholder="Describe the issue"
  className="w-full border rounded-lg p-2 text-sm"
  value={issueText}
  onChange={(e) => setIssueText(e.target.value)}
/>
                {/* <button
                  onClick={() => reportIssue(d._id)}
                  className="bg-red-100 text-red-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                  <AlertTriangle size={18} /> Report Issue
                </button> */}
                <button
  disabled={actionLoading}
  onClick={() => reportIssue(d._id, issueText)}
  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold disabled:opacity-50"
>
  Submit Issue
</button>
              </div>
            )}

            {(d.deliveryStatus === "CONFIRMED_BY_BUYER" ||
              d.deliveryStatus === "AUTO_CONFIRMED") && (
              <div className="mt-4 flex items-center gap-2 text-purple-700">
                <Clock size={16} />
                Awaiting escrow release
              </div>
            )}

            {d.deliveryStatus === "ESCROW_RELEASED" && (
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-medium">
                <CheckCircle size={16} /> Payment released to farmer
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

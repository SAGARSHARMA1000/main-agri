import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useOutletContext } from "react-router-dom";

/* ---------- STATUS LABELS ---------- */
const STATUS_LABELS = {
  PICKUP_SCHEDULED: "Pickup Scheduled",
  COLLECTED_FROM_FARMER: "Collected by Agriassure",
  IN_TRANSIT: "In Transit",
  DELIVERED_TO_BUYER: "Delivered to Buyer",
  CONFIRMED_BY_BUYER: "Buyer Confirmed",
  AUTO_CONFIRMED: "Auto Confirmed",
  ESCROW_RELEASED: "Payment Released",
  ISSUE_REPORTED: "Issue Reported"
};

export default function FarmerDeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  //const farmerId = localStorage.getItem("userId");
  const { user } = useOutletContext();

useEffect(() => {
  const fetchDeliveries = async () => {
    try {
      const res = await api.getFarmerDeliveries(user.id);
      setDeliveries(res.data);
    } catch (err) {
      console.error("❌ Failed to load deliveries", err);
    }
  };

  if (user.id) fetchDeliveries();
}, [user?.id]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <Package className="text-emerald-600" /> Delivery Tracking
      </h1>

      <div className="space-y-4">
        {deliveries.map(d => (
          <div key={d._id} className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                {STATUS_LABELS[d.deliveryStatus]}
              </span>
              <span className="text-xs text-gray-400">{d.deliveryId}</span>
            </div>

            <h3 className="font-bold text-lg">{d.crop}</h3>
            <p className="text-sm text-gray-500">{d.quantity}</p>

            <div className="mt-4 text-sm text-gray-700 flex items-center gap-2">
              <Truck size={16} />
              <span>
                Agriassure is handling pickup & delivery. You will be notified
                once payment is released.
              </span>
            </div>

            {d.deliveryStatus === "ESCROW_RELEASED" && (
              <div className="mt-3 flex items-center gap-2 text-emerald-600 font-medium">
                <CheckCircle size={16} /> Escrow released successfully
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

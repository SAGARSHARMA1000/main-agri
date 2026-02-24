
import React, { useEffect, useMemo, useState } from "react";
import {
  Truck,
  MapPin,
  Package,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ShieldCheck,
  User,
  Navigation,
  Box,
  X,
  ArrowRight
} from "lucide-react";
import api from "../services/api";

/* ================= STATUS FLOW (UNCHANGED) ================= */

const STATUS_FLOW = [
  { id: "PICKUP_SCHEDULED", label: "Pickup Scheduled", color: "bg-gray-100 text-gray-600", icon: Clock },
  { id: "COLLECTED_FROM_FARMER", label: "Collected", color: "bg-blue-100 text-blue-700", icon: Box },
  { id: "IN_TRANSIT", label: "In Transit", color: "bg-yellow-100 text-yellow-800", icon: Truck },
  { id: "DELIVERED_TO_BUYER", label: "Delivered", color: "bg-purple-100 text-purple-700", icon: MapPin },
  { id: "ESCROW_RELEASED", label: "Completed", color: "bg-emerald-100 text-emerald-700", icon: ShieldCheck }
];

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, sub, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
      <p className="text-xs text-emerald-600 font-medium mt-1">{sub}</p>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

/* ================= STATUS STEPPER ================= */

const StatusStepper = ({ currentStatus }) => {
  const currentIndex = STATUS_FLOW.findIndex(s => s.id === currentStatus);

  return (
    <div className="flex items-center w-full mt-4 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
      <div
        className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{ width: `${(currentIndex / (STATUS_FLOW.length - 1)) * 100}%` }}
      />
      {STATUS_FLOW.map((step, idx) => {
        const Icon = step.icon;
        const active = idx <= currentIndex;
        const current = idx === currentIndex;

        return (
          <div key={step.id} className="flex-1 flex flex-col items-center z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                ${active ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-gray-300 text-gray-400"}
                ${current ? "scale-125 ring-4 ring-emerald-100" : ""}`}
            >
              <Icon size={14} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ================= MAIN DASHBOARD ================= */

export default function AdminDeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  const fetchDeliveries = async () => {
    setLoading(true);
    const res = await api.getAllDeliveries();

    const mapped = res.data.deliveries.map(d => ({
      _id: d._id,
      id: d.deliveryId,
      crop: d.crop,
      qty: d.quantity,
      status: d.deliveryStatus,
      farmerId: d.farmerId|| "Farmer",
      buyerId: d.buyerId || "Buyer",
      deliveryAddress: d.deliveryAddress || "—",
      pickupAddress: d.pickupAddress || "—",
      vehicle: d.vehicleNumber || "MP67-223",
      driver: d.driverName || "—",
      lastUpdate: new Date(d.updatedAt).toLocaleString()
    }));

    setDeliveries(mapped);
    setLoading(false);
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    return {
      active: deliveries.filter(d => d.status !== "ESCROW_RELEASED").length,
      pickup: deliveries.filter(d => d.status === "PICKUP_SCHEDULED").length,
      transit: deliveries.filter(d => d.status === "IN_TRANSIT").length,
      completed: deliveries.filter(d => d.status === "ESCROW_RELEASED").length
    };
  }, [deliveries]);

  /* ================= HELPERS ================= */

  const getNextStatus = (status) => {
    const idx = STATUS_FLOW.findIndex(s => s.id === status);
    return idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  };

  const advanceStatus = async () => {
    if (!selectedDelivery) return;

    setLoading(true);
    const s = selectedDelivery.status;

    if (s === "PICKUP_SCHEDULED") await api.collectFromFarmer(selectedDelivery._id);
    if (s === "COLLECTED_FROM_FARMER") await api.markInTransit(selectedDelivery._id);
    if (s === "IN_TRANSIT") await api.markDeliveredToBuyer(selectedDelivery._id);

    await fetchDeliveries();
    setSelectedDelivery(null);
    setLoading(false);
  };

  /* ================= FILTERING ================= */

  const visible = deliveries.filter(d => {
    const matchFilter = filter === "ALL" || d.status === filter;
    const matchSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.crop.toLowerCase().includes(search.toLowerCase()) ||
      d.farmer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  /* ================= MODAL ================= */

  const UpdateModal = () => {
    if (!selectedDelivery) return null;
    const next = getNextStatus(selectedDelivery.status);
    if (!next) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md animate-scale-up shadow-2xl">
          <div className="p-6 flex justify-between border-b">
            <h3 className="font-bold">Update Shipment Status</h3>
            <button onClick={() => setSelectedDelivery(null)}>
              <X />
            </button>
          </div>
          <div className="p-6">
            <p className="text-sm mb-4">
              Confirm next action → <strong>{next.label}</strong>
            </p>
            <button
              disabled={loading}
              onClick={advanceStatus}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg"
            >
              {loading ? "Processing..." : `Confirm ${next.label}`}
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ================= RENDER ================= */

  return (
    // <div className="min-h-screen bg-gray-50 p-4 md:p-8">
    //   <div className="max-w-7xl mx-auto">

    //     {/* HEADER */}
    //     <header className="flex flex-col md:flex-row justify-between mb-8 gap-4">
    //       <div>
    //         <h1 className="text-5xl font-bold flex items-center gap-2">
    //           <Navigation className="text-blue-600" />
    //           Logistics Control Tower
    //         </h1>
    //         <p className="text-gray-500">Real-time oversight of all deliveries</p>
    //       </div>
    //     </header>
    // <div className="min-h-screen bg-gray-500 pt-32 md:pt-36 px-4 md:px-8">
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-800 to-slate-900 pt-32 md:pt-36 px-4 md:px-8">
  <div className="max-w-7xl mx-auto">

    {/* HEADER */}
    <header className="flex flex-col md:flex-row justify-between mb-10 gap-4">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
          <span className="text-blue-600">🚚</span>
          Logistics Control Tower
        </h1>
        <p className="text-gray-500 text-base md:text-lg mt-1">
          Real-time oversight of all deliveries
        </p>
      </div>
    </header>


        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Deliveries" value={stats.active} sub="Ongoing" icon={Truck} color="bg-blue-100 text-blue-600" />
          <StatCard title="Pickup Pending" value={stats.pickup} sub="Needs action" icon={Clock} color="bg-yellow-100 text-yellow-600" />
          <StatCard title="In Transit" value={stats.transit} sub="On the way" icon={MapPin} color="bg-orange-100 text-orange-600" />
          <StatCard title="Completed" value={stats.completed} sub="Escrow released" icon={CheckCircle} color="bg-emerald-100 text-emerald-600" />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex flex-col lg:flex-row gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shipment, crop, farmer..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Filter size={18} className="text-gray-400" />
              <button onClick={() => setFilter("ALL")} className="filter-btn">All</button>
              {STATUS_FLOW.map(s => (
                <button key={s.id} onClick={() => setFilter(s.id)} className="filter-btn">
                  {s.label}
                </button>
              ))}
            </div>
          </div>
{/* 
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {visible.map(d => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-bold">{d.id}</p>
                      <p className="text-xs">{d.crop} • {d.qty}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <User size={12} /> {d.farmerId}
                      </p>
                    </td>
                    <td className="p-4">{d.location}</td>
                    <td className="p-4 min-w-[300px]">
                      <StatusStepper currentStatus={d.status} />
                    </td>
                    <td className="p-4 text-right">
                      {getNextStatus(d.status) ? (
                        <button
                          onClick={() => setSelectedDelivery(d)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-900 hover:text-white"
                        >
                          Update Status
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-bold flex items-center gap-1 justify-end">
                          <CheckCircle size={14} /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && visible.length === 0 && (
              <p className="p-12 text-center text-gray-500">No deliveries found</p>
            )}
          </div> */}
          <div className="overflow-x-auto">
  <table className="w-full text-sm">
    <tbody>
      {visible.map((d) => (
        <tr key={d.id} className="border-b hover:bg-gray-50 align-top">
          
          {/* Delivery Basic Info */}
          <td className="p-4 w-[250px]">
            <p className="font-bold text-gray-900">Delivery ID: {d.id}</p>
            <p className="text-xs text-gray-600 mt-1">
              Crop: {d.crop}
            </p>
            <p className="text-xs text-gray-600">
              Quantity: {d.qty}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <User size={12} /> Farmer: {d.farmerName || d.farmerId}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <User size={12} /> Buyer: {d.buyerId}
            </p>
          </td>

          {/* Pickup Address */}
          <td className="p-4 w-[250px]">
            <p className="font-semibold text-gray-800">Pickup Address</p>
            <p className="text-xs text-gray-600 mt-1">
              {d.pickupAddress}
            </p>
            <p className="text-xs text-gray-600">
              {d.pickupAddress?.city}, {d.pickupAddress?.state}
            </p>
            <p className="text-xs text-gray-600">
              {d.pickupAddress?.pincode}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Contact: {d.pickupContact} 882345633
            </p>
          </td>

          {/* Delivery Address */}
          <td className="p-4 w-[250px]">
            <p className="font-semibold text-gray-800">Delivery Address</p>
            <p className="text-xs text-gray-600 mt-1">
              {d.deliveryAddress}
            </p>
            <p className="text-xs text-gray-600">
              {d.deliveryAddress?.city}, {d.deliveryAddress?.state}
            </p>
            <p className="text-xs text-gray-600">
              {d.deliveryAddress?.pincode}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Contact: {d.deliveryContact} 62345944
            </p>
          </td>

          {/* Status Section */}
          <td className="p-4 min-w-[280px]">
            <StatusStepper currentStatus={d.status} />
          </td>

          {/* Action */}
          <td className="p-4 text-right">
            {getNextStatus(d.status) ? (
              <button
                onClick={() => setSelectedDelivery(d)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-900 hover:text-white transition"
              >
                Update Status
              </button>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1 justify-end">
                <CheckCircle size={14} /> Completed
              </span>
            )}
          </td>

        </tr>
      ))}
    </tbody>
  </table>

  {!loading && visible.length === 0 && (
    <p className="p-12 text-center text-gray-500">
      No deliveries found
    </p>
  )}
</div>
        </div>
      </div>

      <UpdateModal />
    </div>
  );
}

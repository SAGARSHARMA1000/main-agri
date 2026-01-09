import React, { useEffect, useState } from "react";
import { FileText, Download, ShieldCheck } from "lucide-react";
import api from "../../services/api";
import { useOutletContext } from "react-router-dom";

export default function ContractPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useOutletContext();
  //const buyerId = user?.id;

  /* ---------------- FETCH BUYER CONTRACTS ---------------- */

  useEffect(() => {
    const fetchContracts = async () => {
      try {
       // const buyerId = localStorage.getItem("userId");
       
        const res = await api.getBuyerContracts(user.id);

        console.log("📜 Buyer contracts:", res.data.contracts);
        setContracts(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch contracts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  /* ---------------- HELPERS ---------------- */

  const statusBadge = (status) => {
    const map = {
      draft: "bg-gray-100 text-gray-700",
      sent_to_farmer: "bg-blue-100 text-blue-700",
      active: "bg-emerald-100 text-emerald-700",
      completed: "bg-purple-100 text-purple-700"
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  const formatStatus = (status) =>
    status.replaceAll("_", " ").toUpperCase();

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading contracts...
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */

  if (!contracts.length) {
    return (
      <div className="p-10 bg-white border rounded-xl text-center">
        <FileText size={48} className="mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          No Contracts Yet
        </h3>
        <p className="text-sm text-gray-500">
          You haven’t drafted or sent any contracts yet.
        </p>
      </div>
    );
  }

  /* ---------------- RENDER ---------------- */

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <ShieldCheck className="text-emerald-600" />
        My Contracts
      </h2>

      {contracts.map((c) => (
        <div
          key={c._id}
          className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {c.commodity} Contract
              </h3>
              <p className="text-sm text-gray-500">
                Farmer: {c.farmerName}
              </p>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${statusBadge(
                c.status
              )}`}
            >
              {formatStatus(c.status)}
            </span>
          </div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <p>
              <b>Quantity:</b> {c.quantity} {c.unit}
            </p>
            <p>
              <b>Price / Unit:</b> ₹{c.offerPrice}
            </p>
            <p>
              <b>Total Value:</b>{" "}
              ₹{(c.quantity * c.offerPrice).toLocaleString()}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50"
              onClick={() =>
                window.open(`/dashboard/buyer/contracts/${c._id}`)
              }
            >
              View Contract
            </button>

            {c.pdf?.url && (
              <a
                href={`http://localhost:4000/${c.pdf.url}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-emerald-700"
              >
                <Download size={23} /> Download PDF
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

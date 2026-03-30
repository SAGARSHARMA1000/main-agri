
import React, { useState } from "react";
import api from "../../services/api";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddListingForm = ({ user, onListingCreated }) => {
  const navigate = useNavigate();
  const { fetchListings, refreshMarketplace } = useOutletContext();

  const [formData, setFormData] = useState({
    commodity: "",
    quantity: "",
    price: "",
    unit: "quintal",
    // farmAddress: user?.farmAddress || "",
     farmAddress:"",
    negotiationAllowed: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        commodity: formData.commodity,
        quantity: `${formData.quantity} ${formData.unit}`,
        price: Number(formData.price),
        farmAddress: formData.farmAddress,
        negotiationAllowed: formData.negotiationAllowed,
        farmerId: user.id,
        farmerName: user.name,
      };

      const resp = await api.createListing(payload);

      fetchListings();
      refreshMarketplace();

      navigate("/dashboard/farmer/listings", {
        state: { refresh: true }
      });

    } catch (err) {
      console.error("Listing creation failed:", err);
      setError("Failed to publish listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-5 sm:p-8 rounded-xl shadow-md space-y-4"
      >

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">
          Add New Crop Listing
        </h2>

        {/* Commodity */}
        <input
          required
          placeholder="Commodity (e.g. Wheat)"
          className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.commodity}
          onChange={(e) =>
            setFormData({ ...formData, commodity: e.target.value })
          }
        />

        {/* Quantity */}
        <input
          required
          type="number"
          placeholder="Quantity"
          className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />

        {/* Unit */}
        <select
          className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.unit}
          onChange={(e) =>
            setFormData({ ...formData, unit: e.target.value })
          }
        >
          <option value="quintal">Per Quintal</option>
          <option value="kg">Per Kg</option>
        </select>

        {/* Price */}
        <input
          required
          type="number"
          placeholder="Price per unit"
          className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />

        {/* Location */}
        <input
          placeholder="Location"
          className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.farmAddress}
          onChange={(e) =>
            setFormData({ ...formData, farmAddress: e.target.value })
          }
        />

        {/* Negotiation */}
        <label className="flex items-center gap-2 text-sm sm:text-base">
          <input
            type="checkbox"
            checked={formData.negotiationAllowed}
            onChange={(e) =>
              setFormData({
                ...formData,
                negotiationAllowed: e.target.checked
              })
            }
          />
          Allow Negotiation
        </label>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-700 transition disabled:opacity-70"
        >
          {loading ? "Publishing..." : "Publish Listing"}
        </button>

      </form>
    </div>
  );
};

export default AddListingForm;
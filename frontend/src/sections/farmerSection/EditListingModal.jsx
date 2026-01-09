import React, { useState, useEffect } from "react";
import api from "../../services/api";

const EditListingModal = ({ isOpen, onClose, listing, fetchListings,refreshMarketplace }) => {
  const [form, setForm] = useState({
    commodity: "",
    quantity: "",
    price: "",
    farmAddress: "",
    negotiationAllowed: false,
    negotiationRange: ""
  });

  const [errors, setErrors] = useState({});

  /* PREFILL FORM */
  useEffect(() => {
    if (listing) {
      setForm({
        commodity: listing.commodity || "",
        quantity: listing.quantity || "",
        price: listing.price || "",
        farmAddress: listing.farmAddress || "",
        negotiationAllowed: listing.negotiationAllowed || false,
        negotiationRange: listing.negotiationRange || ""
      });
    }
  }, [listing]);

  /* VALIDATION */
  const validate = () => {
    const err = {};

    if (!form.commodity) err.commodity = "Crop name is required";
    if (!form.quantity) err.quantity = "Quantity is required";
    if (!form.price || form.price <= 0) err.price = "Valid price required";
    if (!form.farmAddress) err.farmAddress = "Farm address required";

    if (form.negotiationAllowed && !form.negotiationRange) {
      err.negotiationRange = "Negotiation range required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
        await api.updateListing(listing._id, form);
     fetchListings();
     refreshMarketplace();
      onClose();
    } catch (err) {
      alert("Failed to update listing");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* COMMODITY */}
          <div>
            <label className="text-sm font-medium">Crop Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.commodity}
              onChange={(e) => setForm({ ...form, commodity: e.target.value })}
            />
            {errors.commodity && <p className="text-red-500 text-xs">{errors.commodity}</p>}
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium">Price (₹)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm font-medium">Farm Address</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.farmAddress}
              onChange={(e) => setForm({ ...form, farmAddress: e.target.value })}
            />
            {errors.farmAddress && <p className="text-red-500 text-xs">{errors.farmAddress}</p>}
          </div>

          {/* NEGOTIATION */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.negotiationAllowed}
              onChange={(e) =>
                setForm({ ...form, negotiationAllowed: e.target.checked })
              }
            />
            <span className="text-sm">Allow Negotiation</span>
          </div>

          {form.negotiationAllowed && (
            <div>
              <label className="text-sm font-medium">Negotiation Range</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={form.negotiationRange}
                onChange={(e) =>
                  setForm({ ...form, negotiationRange: e.target.value })
                }
              />
              {errors.negotiationRange && (
                <p className="text-red-500 text-xs">{errors.negotiationRange}</p>
              )}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingModal;

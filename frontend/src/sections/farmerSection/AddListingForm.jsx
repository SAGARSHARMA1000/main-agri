// import React, { useState } from "react";
// import api from "../../services/api";
// import { useNavigate } from "react-router-dom";

// const AddListingForm = ({ user, onListingCreated }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     commodity: "",
//     quantity: "",
//     price: "",
//     unit: "quintal",
//     location: user.location || "",
//    // negotiationAllowed: true,
//     //image: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // 🧠 Build payload for backend
//       const payload = new FormData();
//       payload.append("commodity", formData.commodity);
//       payload.append("quantity", formData.quantity);
//       payload.append("price", formData.price);
//       payload.append("unit", formData.unit);
//       payload.append("location", formData.location);
//       //payload.append("negotiationAllowed", formData.negotiationAllowed);
//       //payload.append("sellerId", user.id);
//       //payload.append("sellerName", user.name);

//       if (formData.image) {
//         payload.append("image", formData.image);
//       }

//       // 🔥 DB CALL
//       const resp = await api.createListing(payload);

//       const savedListing = resp.data.listing;

//       // ✅ UPDATE APP STATE (IMPORTANT)
//       onListingCreated(savedListing);

//       // 🔁 Redirect to listings page
//       navigate("/dashboard/farmer/listings");

//     } catch (err) {
//       console.error("Listing creation failed", err);
//       setError("Failed to publish listing. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

//       <h2 className="text-xl font-bold">Add New Crop Listing</h2>

//       {/* Commodity */}
//       <input
//         required
//         placeholder="Commodity (e.g. Wheat)"
//         className="w-full border p-3 rounded"
//         value={formData.commodity}
//         onChange={(e) =>
//           setFormData({ ...formData, commodity: e.target.value })
//         }
//       />

//       {/* Quantity */}
//       <input
//         required
//         placeholder="Quantity (e.g. 50)"
//         className="w-full border p-3 rounded"
//         value={formData.quantity}
//         onChange={(e) =>
//           setFormData({ ...formData, quantity: e.target.value })
//         }
//       />

//       {/* Unit */}
//       <select
//         className="w-full border p-3 rounded"
//         value={formData.unit}
//         onChange={(e) =>
//           setFormData({ ...formData, unit: e.target.value })
//         }
//       >
//         <option value="quintal">Per Quintal</option>
//         <option value="kg">Per Kg</option>
//       </select>

//       {/* Price */}
//       <input
//         required
//         type="number"
//         placeholder="Price per unit"
//         className="w-full border p-3 rounded"
//         value={formData.price}
//         onChange={(e) =>
//           setFormData({ ...formData, price: e.target.value })
//         }
//       />

//       {/* Location */}
//       <input
//         placeholder="Location"
//         className="w-full border p-3 rounded"
//         value={formData.location}
//         onChange={(e) =>
//           setFormData({ ...formData, location: e.target.value })
//         }
//       />

//       {/* Negotiation */}
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           checked={formData.negotiationAllowed}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               negotiationAllowed: e.target.checked
//             })
//           }
//         />
//         Allow Negotiation
//       </label>

//       {/* Image */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) =>
//           setFormData({ ...formData, image: e.target.files[0] })
//         }
//       />

//       {error && <p className="text-red-500">{error}</p>}

//       <button
//         disabled={loading}
//         className="bg-green-600 text-white px-6 py-3 rounded font-bold disabled:opacity-70"
//       >
//         {loading ? "Publishing..." : "Publish Listing"}
//       </button>
//     </form>
//   );
// };

// export default AddListingForm;

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
    farmAddress: user?.farmAddress || "",
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
      /**
       * 🔴 TEMPORARY PAYLOAD (UNTIL JWT)
       * sellerId is sent ONLY because JWT is not implemented yet
       * Later this will be removed and backend will read sellerId from token
       */
      const payload = {
        commodity: formData.commodity,
        quantity: `${formData.quantity} ${formData.unit}`,
        price: Number(formData.price),
        farmAddress: formData.farmAddress,
        negotiationAllowed: formData.negotiationAllowed,

        // TEMP — REMOVE AFTER JWT
        farmerId:user.id,
        farmerName: user.name,
                
        
      };

      const resp = await api.createListing(payload);

      //const savedListing = resp.data?.listing;
      fetchListings();  
      refreshMarketplace();

      // ✅ Update parent state (FarmerDashboard → listings)
      // if (savedListing) {
      //   onListingCreated(savedListing);
      // }

      // 🔁 Go back to farmer listings page
     // navigate("/dashboard/farmer");
     
    // ✅ navigate back and force refresh
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

      <h2 className="text-xl font-bold">Add New Crop Listing</h2>

      {/* Commodity */}
      <input
        required
        placeholder="Commodity (e.g. Wheat)"
        className="w-full border p-3 rounded"
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
        className="w-full border p-3 rounded"
        value={formData.quantity}
        onChange={(e) =>
          setFormData({ ...formData, quantity: e.target.value })
        }
      />

      {/* Unit */}
      <select
        className="w-full border p-3 rounded"
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
        className="w-full border p-3 rounded"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
      />

      {/* Location */}
      <input
        placeholder="Location"
        className="w-full border p-3 rounded"
        value={formData.farmAddress}
        onChange={(e) =>
          setFormData({ ...formData, location: e.target.value })
        }
      />

      {/* Negotiation */}
      <label className="flex items-center gap-2">
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

      {error && <p className="text-red-500">{error}</p>}

      <button
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded font-bold disabled:opacity-70"
      >
        {loading ? "Publishing..." : "Publish Listing"}
      </button>
    </form>
  );
};

export default AddListingForm;


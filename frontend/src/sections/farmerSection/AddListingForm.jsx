
// import React, { useState } from "react";
// import api from "../../services/api";
// import { useOutletContext } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const AddListingForm = ({ user, onListingCreated }) => {
//   const navigate = useNavigate();
//   const { fetchListings, refreshMarketplace } = useOutletContext();
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     commodity: "",
//     quantity: "",
//     price: "",
//     unit: "quintal",
//     farmAddress:"",
//     negotiationAllowed: false
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const payload = {
//         commodity: formData.commodity,
//         quantity: `${formData.quantity} ${formData.unit}`,
//         price: Number(formData.price),
//         farmAddress: formData.farmAddress,
//         negotiationAllowed: formData.negotiationAllowed,
//         farmerId: user.id,
//         farmerName: user.name,
//       };

//       const resp = await api.createListing(payload);

//       fetchListings();
//       refreshMarketplace();

//       navigate("/dashboard/farmer/listings", {
//         state: { refresh: true }
//       });

//     } catch (err) {
//       console.error("Listing creation failed:", err);
//       setError("Failed to publish listing. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl bg-white p-5 sm:p-8 rounded-xl shadow-md space-y-4"
//       >

//         <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">
//           Add New Crop Listing
//         </h2>

//         {/* Commodity */}
//         <input
//           required
//           placeholder="Commodity (e.g. Wheat)"
//           className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={formData.commodity}
//           onChange={(e) =>
//             setFormData({ ...formData, commodity: e.target.value })
//           }
//         />
//         <input
//   type="file"
//   accept="image/*"
//   className="w-full p-3 bg-black text-white border border-gray-700 rounded-xl"
//   onChange={(e) => {

//     const file = e.target.files[0];
//     setImageFile(file);

//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }

//   }}
// />

// {imagePreview && (
//   <img
//     src={imagePreview}
//     alt="preview"
//     className="mt-4 w-32 h-32 object-cover rounded-lg border border-gray-700"
//   />
// )}

//         {/* Quantity */}
//         <input
//           required
//           type="number"
//           placeholder="Quantity"
//           className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={formData.quantity}
//           onChange={(e) =>
//             setFormData({ ...formData, quantity: e.target.value })
//           }
//         />

//         {/* Unit */}
//         <select
//           className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={formData.unit}
//           onChange={(e) =>
//             setFormData({ ...formData, unit: e.target.value })
//           }
//         >
//           <option value="quintal">Per Quintal</option>
//           <option value="kg">Per Kg</option>
//         </select>

//         {/* Price */}
//         <input
//           required
//           type="number"
//           placeholder="Price per unit"
//           className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={formData.price}
//           onChange={(e) =>
//             setFormData({ ...formData, price: e.target.value })
//           }
//         />

//         {/* Location */}
//         <input
//           placeholder="Location"
//           className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={formData.farmAddress}
//           onChange={(e) =>
//             setFormData({ ...formData, farmAddress: e.target.value })
//           }
//         />

//         {/* Negotiation */}
//         <label className="flex items-center gap-2 text-sm sm:text-base">
//           <input
//             type="checkbox"
//             checked={formData.negotiationAllowed}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 negotiationAllowed: e.target.checked
//               })
//             }
//           />
//           Allow Negotiation
//         </label>

//         {error && (
//           <p className="text-red-500 text-sm">{error}</p>
//         )}

//         <button
//           disabled={loading}
//           className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-700 transition disabled:opacity-70"
//         >
//           {loading ? "Publishing..." : "Publish Listing"}
//         </button>

//       </form>
//     </div>
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

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    commodity: "",
    quantity: "",
    price: "",
    unit: "quintal",
    farmAddress: "",
    negotiationAllowed: false,
    minPrice: "",
    maxPrice: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- SUBMIT ----------------
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const payload = {
  //       commodity: formData.commodity,
  //       quantity: `${formData.quantity} ${formData.unit}`,
  //       price: Number(formData.price),
  //       farmAddress: formData.farmAddress,
  //       negotiationAllowed: formData.negotiationAllowed,
  //       farmerId: user.id,
  //       farmerName: user.name,

  //       // ✅ include range only if negotiation enabled
  //       ...(formData.negotiationAllowed && {
  //         minPrice: Number(formData.minPrice),
  //         maxPrice: Number(formData.maxPrice)
  //       })
  //     };

  //     await api.createListing(payload);

  //     fetchListings();
  //     refreshMarketplace();

  //     navigate("/dashboard/farmer/listings", {
  //       state: { refresh: true }
  //     });

  //   } catch (err) {
  //     console.error("Listing creation failed:", err);
  //     setError("Failed to publish listing. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    // ✅ Basic validation
    if (!formData.commodity || !formData.quantity || !formData.price) {
      setError("Please fill all required fields");
      return;
    }

    // ✅ Negotiation validation
    if (formData.negotiationAllowed) {
      if (!formData.minPrice || !formData.maxPrice) {
        setError("Enter min and max price");
        return;
      }

      if (Number(formData.minPrice) > Number(formData.maxPrice)) {
        setError("Min price cannot be greater than max price");
        return;
      }
    }

    // ================= PAYLOAD =================
    const payload = {
      commodity: formData.commodity,
      quantity: `${formData.quantity} ${formData.unit}`,
      price: Number(formData.price),
      farmAddress: formData.farmAddress,
      negotiationAllowed: formData.negotiationAllowed,
      farmerId: user.id,
      farmerName: user.name,

      ...(formData.negotiationAllowed && {
        minPrice: Number(formData.minPrice),
        maxPrice: Number(formData.maxPrice)
      })
    };

    // ================= FORM DATA =================
    const formDataToSend = new FormData();
    for (let key in payload) {
      formDataToSend.append(key, payload[key]);
    }


    // ✅ Append image
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    // ================= API CALL =================
    await api.createListing(formDataToSend);

    // ================= REFRESH =================
    fetchListings();
    refreshMarketplace();

    navigate("/dashboard/farmer/listings", {
      state: { refresh: true }
    });

  } catch (err) {
    console.error("Listing creation failed:", err);
    setError(
      err?.response?.data?.message || "Failed to publish listing. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  // ---------------- UI ----------------
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 min-h-screen py-10 bg-white">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl
        bg-white backdrop-blur-xl
        border border-gray-200
        p-6 sm:p-8 rounded-2xl shadow-xl
        space-y-5 text-black"
      >

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
          Add New Crop Listing
        </h2>

        {/* Commodity */}
        <input
          required
          placeholder="Commodity (e.g. Wheat)"
          className="w-full p-3 rounded-lg bg-white border border-gray-400
          focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.commodity}
          onChange={(e) =>
            setFormData({ ...formData, commodity: e.target.value })
          }
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 bg-white border border-gray-400 rounded-lg"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);

            if (file) {
              setImagePreview(URL.createObjectURL(file));
            }
          }}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-full max-h-48 object-cover rounded-lg border border-white/10"
          />
        )}

        {/* Quantity + Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="number"
            placeholder="Quantity"
            className="w-full p-3 rounded-lg bg-white border border-gray-400
            focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />

          <select
            className="w-full p-3 rounded-lg bg-white border border-gray-400
            focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.unit}
            onChange={(e) =>
              setFormData({ ...formData, unit: e.target.value })
            }
          >
            <option value="quintal">Per Quintal</option>
            <option value="kg">Per Kg</option>
          </select>
        </div>

        {/* Price */}
        <input
          required
          type="number"
          placeholder="Price per unit"
          className="w-full p-3 rounded-lg bg-white border border-gray-400
          focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />

        {/* Location */}
        <input
          placeholder="Location"
          className="w-full p-3 rounded-lg bg-white border border-gray-400
          focus:outline-none focus:ring-2 focus:ring-green-500"
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

        {/* ✅ PRICE RANGE (ONLY IF ENABLED) */}
        {formData.negotiationAllowed && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min Price"
              className="w-full p-3 rounded-lg bg-white border border-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.minPrice}
              onChange={(e) =>
                setFormData({ ...formData, minPrice: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Max Price"
              className="w-full p-3 rounded-lg bg-white border border-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.maxPrice}
              onChange={(e) =>
                setFormData({ ...formData, maxPrice: e.target.value })
              }
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full sm:w-auto
          bg-linear-to-r from-green-500 to-emerald-600
          hover:from-green-400 hover:to-emerald-500
          text-white px-6 py-3 rounded-lg font-semibold
          transition-all duration-300 shadow-md hover:shadow-green-500/30
          disabled:opacity-70"
        >
          {loading ? "Publishing..." : "Publish Listing"}
        </button>

      </form>
    </div>
  );
};

export default AddListingForm;
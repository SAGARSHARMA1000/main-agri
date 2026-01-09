// import React from "react";
// import { Wheat, Sun, CloudRain } from "lucide-react";

// const MandiTicker = ({ onViewAll }) => {
//   return (
//     <div className="container mx-auto px-4 -mt-10 relative z-20 mb-12 text-2xl">
//       <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap items-center gap-6 border-b-4 border-green-600">

//         {/* Wheat */}
//         <div className="flex items-center gap-3">
//           <div className="bg-green-100 p-2 rounded-full">
//             <Wheat className="text-green-600 size-8" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Wheat (MP)</p>
//             <p className="font-bold text-gray-800">
//               ₹2,450 <span className="text-green-600 text-xl">▲ 2%</span>
//             </p>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="hidden md:block w-px h-10 bg-gray-200" />

//         {/* Mustard */}
//         <div className="flex items-center gap-3">
//           <div className="bg-yellow-100 p-2 rounded-full">
//             <Sun className="text-yellow-600 size-8" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Mustard (RJ)</p>
//             <p className="font-bold text-gray-800">
//               ₹5,200 <span className="text-red-600 text-xl">▼ 1%</span>
//             </p>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="hidden md:block w-px h-10 bg-gray-200" />

//         {/* Chana */}
//         <div className="flex items-center gap-3">
//           <div className="bg-blue-100 p-2 rounded-full">
//             <CloudRain className="text-blue-600 size-8" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Chana (MH)</p>
//             <p className="font-bold text-gray-800">
//               ₹4,800 <span className="text-green-600 text-xl">▲ 0.5%</span>
//             </p>
//           </div>
//         </div>

//         {/* View All */}
//         <button
//           onClick={onViewAll}
//           className="ml-auto text-green-600 font-bold hover:text-green-700 text-2xl"
//         >
//           View All Rates →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MandiTicker;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

const mandiData = [
  {
    id: 1,
    crop: "Wheat",
    state: "Madhya Pradesh",
    mandi: "Bhopal",
    price: 2450,
    quality: "A",
    trend: "up",
    image: "https://images.unsplash.com/photo-1602526219045-bb2c3d3c4d94"
  },
  {
    id: 2,
    crop: "Soybean",
    state: "Maharashtra",
    mandi: "Nagpur",
    price: 4350,
    quality: "B",
    trend: "down",
    image: "https://images.unsplash.com/photo-1598514982901-ae62764ae93b"
  }
];

const MandiRates = () => {
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [quality, setQuality] = useState("");

  return (
    <section className="bg-emerald-50 min-h-screen px-6 lg:px-20 py-16">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Live Mandi Rates
        </h1>
        <p className="text-lg text-gray-600">
          Updated crop prices across Indian states and mandis
        </p>
      </motion.div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow p-5 mb-12 flex flex-wrap gap-4 justify-between">
        <select className="border px-4 py-2 rounded-lg">
          <option>All States</option>
          <option>Madhya Pradesh</option>
          <option>Maharashtra</option>
        </select>

        <select className="border px-4 py-2 rounded-lg">
          <option>All Crops</option>
          <option>Wheat</option>
          <option>Soybean</option>
        </select>

        <div className="flex gap-2">
          {["A", "B", "FAQ"].map(q => (
            <button
              key={q}
              className={`px-4 py-2 rounded-full border font-semibold ${
                quality === q
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-700"
              }`}
              onClick={() => setQuality(q)}
            >
              Quality {q}
            </button>
          ))}
        </div>
      </div>

      {/* RESULT GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mandiData.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden"
          >
            <img src={item.image} alt={item.crop} className="h-40 w-full object-cover" />

            <div className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{item.crop}</h3>
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-bold">
                  Quality {item.quality}
                </span>
              </div>

              <p className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} /> {item.mandi}, {item.state}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-emerald-700">
                  ₹{item.price}/Qtl
                </span>

                {item.trend === "up" ? (
                  <TrendingUp className="text-green-600" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MandiRates;

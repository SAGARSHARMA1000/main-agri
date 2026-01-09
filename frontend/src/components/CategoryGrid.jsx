import React from "react";

const categories = [
  "Grains",
  "Pulses",
  "Vegetables",
  "Fruits",
  "Spices",
  "Oilseeds",
  "Fiber",
  "Dry Fruits"
];

const CategoryGrid = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
            >
              <div className="bg-gray-100 h-32 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition">
                <span className="text-4xl">🌾</span>
              </div>
              <p className="text-center mt-2 font-bold text-gray-700 group-hover:text-green-700">
                {cat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;

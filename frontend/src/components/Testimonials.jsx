import React from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <div className="py-16 bg-green-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Farmers & Buyers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-green-800 p-6 rounded-xl border border-green-700"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} fill="currentColor" size={16} />
                ))}
              </div>

              <p className="mb-4 italic">
                “Agriassure has transformed how I sell crops. Secure payments
                and fair pricing give me peace of mind.”
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold">
                  R
                </div>
                <div>
                  <p className="font-bold">Rajesh Kumar</p>
                  <p className="text-xs text-green-300">
                    Farmer, Madhya Pradesh
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

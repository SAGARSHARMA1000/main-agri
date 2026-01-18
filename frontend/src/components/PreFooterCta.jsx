import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const PreFooterCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden bg-emerald-900 text-white py-20 md:py-28"
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 md:w-[420px] md:h-[420px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
          Ready to transform agriculture?
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto">
          Join farmers and buyers building trust, transparency, and secure
          contract farming.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14">
          <button className="px-10 py-4 bg-white text-emerald-900 rounded-full font-bold text-lg shadow-xl hover:bg-emerald-50 hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-10 py-4 border-2 border-emerald-700 rounded-full font-bold text-lg hover:bg-emerald-800 transition">
            Contact Sales
          </button>
        </div>

        {/* Newsletter */}
        <div className="max-w-xl mx-auto">
          <p className="text-lg mb-4 font-semibold">
            Subscribe to our newsletter
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 w-full">
              <Mail className="text-emerald-600" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full font-bold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PreFooterCTA;

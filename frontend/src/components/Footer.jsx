
// import React from "react";
// import { Sprout, MapPin, Phone } from "lucide-react";

// const Footer = () => (
//   <footer className="bg-green-900 text-white pt-12 pb-6">
//     <div className="container mx-auto px-4">
//       <div className="grid md:grid-cols-4 gap-8 mb-8">
//         <div>
//           <div className="flex items-center space-x-2 mb-4">
//             <Sprout className="h-6 w-6 text-yellow-400" />
//             <span className="text-xl font-bold">Agriassure</span>
//           </div>
//           <p className="text-green-200 text-sm">
//             Empowering Indian farmers with technology, market linkages, and fair trade practices.
//           </p>
//         </div>
        
//         <div>
//           <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
//           <ul className="space-y-2 text-green-200 text-sm">
//             <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
//             <li><a href="#" className="hover:text-yellow-400">Careers</a></li>
//             <li><a href="#" className="hover:text-yellow-400">Blog</a></li>
//             <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
//           </ul>
//         </div>
        
//         <div>
//           <h4 className="font-bold text-lg mb-4 text-white">Services</h4>
//           <ul className="space-y-2 text-green-200 text-sm">
//             <li><a href="#" className="hover:text-yellow-400">Sell Produce</a></li>
//             <li><a href="#" className="hover:text-yellow-400">Buy Commodities</a></li>
//             <li><a href="#" className="hover:text-yellow-400">Warehouse Services</a></li>
//             <li><a href="#" className="hover:text-yellow-400">Agri Finance</a></li>
//           </ul>
//         </div>
        
//         <div>
//           <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
//           <div className="space-y-2 text-green-200 text-sm">
//             <p className="flex items-center gap-2"><MapPin size={16}/> Sector 62, Noida, UP</p>
//             <p className="flex items-center gap-2"><Phone size={16}/> +91 1800-123-4567</p>
//             <p className="flex items-center gap-2">support@agriassure.com</p>
//           </div>
//         </div>
//       </div>
      
//       <div className="border-t border-green-800 pt-6 text-center text-green-400 text-sm">
//         <p>&copy; 2024 Agriassure Private Limited. All rights reserved.</p>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;
// import React from "react";
// import { Leaf } from "lucide-react";

// const Footer = () => {
//   return (
//     <>
//       {/* ================= FOOTER CTA ================= */}
//       <section className="relative overflow-hidden bg-emerald-900 text-white py-20 md:py-28">
//         {/* Abstract Background Patterns */}
//         <div className="absolute top-0 right-0 w-72 h-72 md:w-[420px] md:h-[420px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//         <div className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

//         <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-10 leading-tight">
//             Ready to transform your agriculture business?
//           </h2>

//           <p className="text-xl md:text-2xl text-emerald-100 mb-10 md:mb-14 max-w-3xl mx-auto">
//             Join thousands of farmers and buyers building the future of
//             contract farming with trust, transparency, and secure payments.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center gap-5">
//             <button
//               className="
//                 w-full sm:w-auto
//                 px-10 md:px-12 py-4 md:py-5
//                 bg-white text-emerald-900
//                 rounded-full font-bold
//                 text-lg md:text-xl
//                 hover:bg-emerald-50
//                 transition-all
//                 shadow-2xl
//                 hover:scale-105 active:scale-95
//               "
//             >
//               Get Started Now
//             </button>

//             <button
//               className="
//                 w-full sm:w-auto
//                 px-10 md:px-12 py-4 md:py-5
//                 bg-transparent
//                 border-2 border-emerald-700
//                 text-white
//                 rounded-full font-bold
//                 text-lg md:text-xl
//                 hover:bg-emerald-800
//                 transition-all
//                 hover:scale-105 active:scale-95
//               "
//             >
//               Contact Sales
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ================= SIMPLE FOOTER ================= */}
//       <footer className="bg-gray-900 text-gray-400 py-10 md:py-14 border-t border-gray-800">
//         <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-8">

//           {/* Brand */}
//           <div className="flex items-center gap-2 font-extrabold text-xl md:text-2xl text-white">
//             <Leaf size={22} className="text-emerald-500" />
//             Agriassure
//           </div>

//           {/* Copyright */}
//           <div className="text-sm md:text-base text-center md:text-left">
//             &copy; 2024 Agriassure Technologies Pvt. Ltd.  
//             <span className="block md:inline"> All rights reserved.</span>
//           </div>

//           {/* Links */}
//           <div className="flex gap-6 md:gap-8 text-base">
//             <a href="#" className="hover:text-white transition-colors">
//               Privacy
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Terms
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Support
//             </a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;
import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Twitter,
  Linkedin,
  Instagram,
  Mail
} from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* ================= FOOTER CTA ================= */}
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Ready to transform agriculture?
          </h2>

          <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto">
            Join farmers and buyers building trust, transparency, and secure
            contract farming.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14">
            <button className="px-10 py-4 bg-white text-emerald-900 rounded-full font-bold text-lg hover:bg-emerald-50 shadow-xl hover:scale-105 transition">
              Get Started
            </button>
            <button className="px-10 py-4 border-2 border-emerald-700 rounded-full font-bold text-lg hover:bg-emerald-800 transition">
              Contact Sales
            </button>
          </div>

          {/* ================= NEWSLETTER ================= */}
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
                  className="flex-1 outline-none text-gray-800"
                />
              </div>
              <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full font-bold transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================= MAIN FOOTER ================= */}
      <motion.footer
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800"
      >
        <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Brand */}
          <div className="flex items-center gap-2 text-white font-extrabold text-xl md:text-2xl">
            <Leaf className="text-emerald-500" size={24} />
            Agriassure
          </div>

          {/* Links */}
          <div className="flex gap-6 text-base">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a className="p-2 bg-gray-800 rounded-full hover:bg-emerald-600 transition">
              <Twitter size={18} />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-emerald-600 transition">
              <Linkedin size={18} />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-emerald-600 transition">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2024 Agriassure Technologies Pvt. Ltd. All rights reserved.
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;

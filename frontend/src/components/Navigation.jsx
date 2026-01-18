// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Leaf, User, LogOut, Menu, X } from "lucide-react";

// const Navigation = ({mobileMenuOpen, setMobileMenuOpen, user, onLogout, onOpenRegister, onDemoLogin }) => (
//     const navigate = useNavigate();
//   <nav className="bg-green-700 text-white sticky top-0 z-50 shadow-lg">
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between items-center h-16">
//         <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
//           <div className="bg-white p-1.5 rounded-full">
//             <Leaf className="h-6 w-6 text-green-700" />
//           </div>
//           <span className="text-xl font-bold tracking-tight">Agriassure</span>
//         </div>

//         <div className="hidden md:flex space-x-8 items-center">
//           <button onClick={() => setActiveTab('home')} className={`font-merriweather text-2xl font-semibold ${activeTab === 'home' ? 'text-yellow-300' : 'hover:text-green-200'}`}>Home</button>
//           <button onClick={() => setActiveTab('market')} className={`font-semibold text-2xl ${activeTab === 'market' ? 'text-yellow-300' : 'hover:text-green-200'}`}>Marketplace</button>
//           <button onClick={() => setActiveTab('prices')} className={`font-medium ${activeTab === 'prices' ? 'text-yellow-300' : 'hover:text-green-200'}`}>Mandi Rates</button>
          
//           {user ? (
//             <div className="flex items-center gap-4 ml-4">
//               <span className="text-sm bg-green-800 px-3 py-1 rounded-full border border-green-600 flex items-center gap-2">
//                 <User size={14} /> {user.name} ({user.role})
//               </span>
//               <button 
//                 onClick={() => setActiveTab('dashboard')} 
//                 className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-4 py-1.5 rounded-md font-bold text-sm transition"
//               >
//                 Dashboard
//               </button>
//               <button onClick={onLogout} className="text-green-200 hover:text-white" title="Logout">
//                 <LogOut size={20} />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2 ml-4">
//               <div className="hidden lg:flex mr-4 gap-2 text-xs">
//                 <button onClick={() => onDemoLogin('farmer')} className="bg-green-800 text-green-200 px-2 py-1 rounded hover:bg-green-600 border border-green-600">Demo: Farmer</button>
//                 <button onClick={() => onDemoLogin('buyer')} className="bg-green-800 text-green-200 px-2 py-1 rounded hover:bg-green-600 border border-green-600">Demo: Buyer</button>
//               </div>

//               <button className="text-green-100 hover:text-white font-medium" onClick={onOpenRegister}>Login</button>
//               <button 
//                 onClick={onOpenRegister}
//                 className="bg-white text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition shadow-md"
//               >
//                 Register
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="md:hidden">
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>
//     </div>
    
//     {mobileMenuOpen && (
//       <div className="md:hidden bg-green-800 p-4 space-y-4">
//         <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-white">Home</button>
//         <button onClick={() => { setActiveTab('market'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-white">Marketplace</button>
//         <button onClick={() => { setActiveTab('prices'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-white">Mandi Rates</button>
//         {user ? (
//           <>
//             <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-yellow-300 font-bold">My Dashboard</button>
//             <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-red-300">Logout</button>
//           </>
//         ) : (
//           <div className="space-y-2">
//              <button onClick={() => { onDemoLogin('farmer'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-green-200">Demo: Farmer Login</button>
//              <button onClick={() => { onDemoLogin('buyer'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-green-200">Demo: Buyer Login</button>
//              <button onClick={() => { onOpenRegister(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-yellow-300 font-bold">Register / Login</button>
//           </div>
//         )}
//       </div>
//     )}
//   </nav>
// );

// export default Navigation;
//28/12/25
// import React from "react";
// import { Leaf, User, LogOut, Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Navigation = ({
//   mobileMenuOpen,
//   setMobileMenuOpen,
//   user,
//   onLogout,
//   onOpenRegister,
//   onOpenLogin,
//   onDemoLogin
// }) => {
//   const navigate = useNavigate();

//   return (
//     <nav className="bg-green-700 text-white sticky top-0 z-50 shadow-lg h-20">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">

//           {/* LOGO */}
//           <div
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <div className="bg-white p-1.5 rounded-full">
//               <Leaf className="h-6 w-6 text-green-700" />
//             </div>
//             <span className="text-2xl font-bold tracking-tight">
//               Agriassure
//             </span>
//           </div>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex space-x-8 items-center">
//             <button
//               onClick={() => navigate("/")}
//               className="text-2xl font-semibold hover:text-green-200"
//             >
//               Home
//             </button>

//             <button
//               onClick={() => navigate("/market")}
//               className="text-2xl font-semibold hover:text-green-200"
//             >
//               Marketplace
//             </button>

//             <button
//               onClick={() => navigate("/prices")}
//               className="text-2xl font-semibold hover:text-green-200"
//             >
//               Mandi Rates
//             </button>

//             {user ? (
//               <div className="flex items-center gap-4 ml-4">
//                 <span className="text-2xl bg-green-800 px-3 py-1 rounded-full border border-green-600 flex items-center gap-2">
//                   <User size={14} /> {user.name} ({user.role})
//                 </span>

//                 <button
//                   onClick={() => navigate(`/dashboard/${user.role}`)}
//                   className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-4 py-1.5 rounded-lg font-bold text-2xl"
//                 >
//                   Dashboard
//                 </button>

//                 <button
//                   onClick={() => {
//                     onLogout();
//                     navigate("/");
//                   }}
//                   className="text-green-200 hover:text-white"
//                   title="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center gap-2 ml-4">
//                 <div className="hidden lg:flex mr-4 gap-2 text-xs">
//                   <button
//                     onClick={() => onDemoLogin("farmer")}
//                     className="bg-green-800 text-green-200 px-2 py-1 rounded hover:bg-green-600 border border-green-600"
//                   >
//                     Demo: Farmer
//                   </button>
//                   <button
//                     onClick={() => onDemoLogin("buyer")}
//                     className="bg-green-800 text-green-200 px-2 py-1 rounded hover:bg-green-600 border border-green-600"
//                   >
//                     Demo: Buyer
//                   </button>
//                 </div>

//                 <button
//                   className="text-green-100 hover:text-white font-medium text-2xl"
//                   onClick={onOpenLogin}
//                 >
//                   Login
//                 </button>

//                 <button
//                   onClick={onOpenRegister}
//                   className="text-2xl bg-white text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition shadow-md"
//                 >
//                   Register
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* MOBILE TOGGLE */}
//           <div className="md:hidden">
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-green-800 p-4 space-y-4">
//           <button
//             onClick={() => {
//               navigate("/");
//               setMobileMenuOpen(false);
//             }}
//             className="block w-full text-left py-2"
//           >
//             Home
//           </button>

//           <button
//             onClick={() => {
//               navigate("/market");
//               setMobileMenuOpen(false);
//             }}
//             className="block w-full text-left py-2"
//           >
//             Marketplace
//           </button>

//           <button
//             onClick={() => {
//               navigate("/prices");
//               setMobileMenuOpen(false);
//             }}
//             className="block w-full text-left py-2"
//           >
//             Mandi Rates
//           </button>

//           {user ? (
//             <>
//               <button
//                 onClick={() => {
//                   navigate(`/dashboard/${user.role}`);
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2 text-yellow-300 font-bold"
//               >
//                 My Dashboard
//               </button>

//               <button
//                 onClick={() => {
//                   onLogout();
//                   navigate("/");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2 text-red-300"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => {
//                   onDemoLogin("farmer");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2"
//               >
//                 Demo: Farmer
//               </button>

//               <button
//                 onClick={() => {
//                   onDemoLogin("buyer");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2"
//               >
//                 Demo: Buyer
//               </button>

//               <button
//                 onClick={() => {
//                   onOpenRegister();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2 text-yellow-300 font-bold"
//               >
//                 Register / Login
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;

// import React from "react";
// import { Leaf, User, LogOut, Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Navigation = ({
//   mobileMenuOpen,
//   setMobileMenuOpen,
//   user,
//   onLogout,
//   onOpenRegister,
//   onOpenLogin,
//   onDemoLogin
// }) => {
//   const navigate = useNavigate();

//   return (
//     <nav className="bg-green-700 text-white sticky top-0 z-50 shadow-lg">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* NAVBAR HEIGHT */}
//         <div className="flex justify-between items-center h-16 lg:h-20">

//           {/* LOGO */}
//           <div
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <div className="bg-white p-1.5 lg:p-2 rounded-full">
//               <Leaf className="h-5 w-5 lg:h-6 lg:w-6 text-green-700" />
//             </div>
//             <span className="text-xl lg:text-2xl font-bold tracking-tight">
//               Agriassure
//             </span>
//           </div>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center gap-6 lg:gap-10">
//             <button
//               onClick={() => navigate("/")}
//               className="font-semibold text-base lg:text-xl hover:text-green-200 transition"
//             >
//               Home
//             </button>

//             <button
//               onClick={() => navigate("/market")}
//               className="font-semibold text-base lg:text-xl hover:text-green-200 transition"
//             >
//               Marketplace
//             </button>

//             <button
//               onClick={() => navigate("/prices")}
//               className="font-semibold text-base lg:text-xl hover:text-green-200 transition"
//             >
//               Mandi Rates
//             </button>

//             {user ? (
//               <div className="flex items-center gap-4 ml-4">
//                 <span className="bg-green-800 px-3 py-1 rounded-full border border-green-600 flex items-center gap-2 text-sm lg:text-base">
//                   <User size={14} /> {user.name} ({user.role})
//                 </span>

//                 <button
//                   onClick={() => navigate(`/dashboard/${user.role}`)}
//                   className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-4 py-2 rounded-lg font-bold text-sm lg:text-base transition"
//                 >
//                   Dashboard
//                 </button>

//                 <button
//                   onClick={() => {
//                     onLogout();
//                     navigate("/");
//                   }}
//                   className="text-green-200 hover:text-white transition"
//                   title="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3 ml-4">
//                 <div className="hidden lg:flex gap-2">
//                   <button
//                     onClick={() => onDemoLogin("farmer")}
//                     className="bg-green-800 text-green-200 px-3 py-1 rounded hover:bg-green-600 border border-green-600 text-sm"
//                   >
//                     Demo: Farmer
//                   </button>
//                   <button
//                     onClick={() => onDemoLogin("buyer")}
//                     className="bg-green-800 text-green-200 px-3 py-1 rounded hover:bg-green-600 border border-green-600 text-sm"
//                   >
//                     Demo: Buyer
//                   </button>
//                   <button
//                     onClick={() => onDemoLogin("admin")}
//                     className="bg-green-800 text-green-200 px-3 py-1 rounded hover:bg-green-600 border border-green-600 text-sm"
//                   >
//                     Demo: Admin
//                   </button>
//                 </div>

//                 <button
//                   className="font-medium text-base lg:text-lg hover:text-white transition"
//                   onClick={onOpenLogin}
//                 >
//                   Login
//                 </button>

//                 <button
//                   onClick={onOpenRegister}
//                   className="bg-white text-green-700 px-4 py-2 rounded-md font-bold text-base lg:text-lg hover:bg-green-50 transition shadow-md"
//                 >
//                   Register
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* MOBILE TOGGLE */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 rounded hover:bg-green-600 transition"
//             >
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-green-800 px-4 py-6 space-y-4">
//           <button
//             onClick={() => {
//               navigate("/");
//               setMobileMenuOpen(false);
//             }}
//             className="block w-full text-left py-2"
//           >
//             Home
//           </button>

//           <button
//             onClick={() => {
//               navigate("/market");
//               setMobileMenuOpen(false);
//             }}
//             className="block w-full text-left py-2"
//           >
//             Marketplace
//           </button>

//           <button
//             onClick={() => {
//               navigate("/prices");
//               setMobileMenuOpen(false);
//             }}
//             className="block w-full text-left py-2"
//           >
//             Mandi Rates
//           </button>

//           {user ? (
//             <>
//               <button
//                 onClick={() => {
//                   navigate(`/dashboard/${user.role}`);
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2 text-yellow-300 font-bold"
//               >
//                 My Dashboard
//               </button>

//               <button
//                 onClick={() => {
//                   onLogout();
//                   navigate("/");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2 text-red-300"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => {
//                   onDemoLogin("farmer");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2"
//               >
//                 Demo: Farmer
//               </button>

//               <button
//                 onClick={() => {
//                   onDemoLogin("buyer");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2"
//               >
//                 Demo: Buyer
//               </button>

//               <button
//                 onClick={() => {
//                   onOpenRegister();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left py-2 text-yellow-300 font-bold"
//               >
//                 Register / Login
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;
import React, { useEffect, useState } from "react";
import { Leaf, User, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  user,
  onLogout,
  onOpenRegister,
  onOpenLogin,
  onDemoLogin
}) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  /* SCROLL EFFECT (same as navbar1) */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 font-bold text-bold md:text-2xl tracking-tight cursor-pointer z-50"
          onClick={() => navigate("/")}
        >
          <div
            className={`
              p-1.5 md:p-2 rounded-lg
              ${scrolled || mobileMenuOpen
                ? "bg-emerald-100 text-emerald-700"
                : "bg-white text-emerald-700"}
            `}
          >
            <Leaf size={20} className="fill-current md:w-6 md:h-6" />
          </div>
          <span className={scrolled || mobileMenuOpen ? "text-gray-900" : "text-white"}>
            Agriassure
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div
          className={`
            hidden md:flex items-center gap-6 lg:gap-8 font-medium
            ${scrolled ? "text-gray-600" : "text-emerald-50"}
          `}
        >
          <button onClick={() => navigate("/")} className="hover:text-emerald-400 transition text-sm lg:text-base">
            Home
          </button>
          <button onClick={() => navigate("/market")} className="hover:text-emerald-400 transition text-sm lg:text-base">
            Marketplace
          </button>
          <button onClick={() => navigate("/prices")} className="hover:text-emerald-400 transition text-sm lg:text-base">
            Mandi Rates
          </button>
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {user ? (
            <>
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center gap-2">
                <User size={14} /> {user.name} ({user.role})
              </span>

              <button
                onClick={() => navigate(`/dashboard/${user.role}`)}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full  font-bold shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 active:scale-95 text-sm"
              >
                Dashboard
              </button>

              <button
                onClick={() => {
                  onLogout();
                  navigate("/");
                }}
                className="text-gray-500 hover:text-red-500 transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <div className="hidden lg:flex gap-2 text-xs">
                <button onClick={() => onDemoLogin("farmer")} className="px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-100">
                  Demo Farmer
                </button>
                <button onClick={() => onDemoLogin("buyer")} className="px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-100">
                  Demo Buyer
                </button>
                <button onClick={() => onDemoLogin("admin")} className="px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-100">
                  Demo Admin
                </button>
              </div>

              <button
                onClick={onOpenLogin}
                className={`px-4 py-2 rounded-full text-2xl lg:3xl font-semibold transition ${
                  scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
              >
                Log In
              </button>

              <button
                onClick={onOpenRegister}
                className="px-5 py-2 text-2xl lg:3xl bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden z-50 p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-gray-900" />
          ) : (
            <Menu size={24} className={scrolled ? "text-gray-900" : "text-white"} />
          )}
        </button>
      </div>

      {/* MOBILE OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col pt-24 px-6 animate-fade-in md:hidden">
          <div className="flex flex-col gap-6 text-lg font-medium text-gray-800">
            <button onClick={() => navigate("/")} className="border-b pb-2">Home</button>
            <button onClick={() => navigate("/market")} className="border-b pb-2">Marketplace</button>
            <button onClick={() => navigate("/prices")} className="border-b pb-2">Mandi Rates</button>

            <div className="flex flex-col gap-3 mt-6">
              {user ? (
                <>
                  <button
                    onClick={() => navigate(`/dashboard/${user.role}`)}
                    className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full py-3 border border-red-300 text-red-500 rounded-lg font-bold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={onOpenLogin} className="w-full py-3 border rounded-lg font-bold">
                    Log In
                  </button>
                  <button onClick={onOpenRegister} className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold">
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

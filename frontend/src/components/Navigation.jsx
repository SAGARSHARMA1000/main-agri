import React, { useEffect, useState } from "react";
import { Leaf, User, LogOut, Menu, X, ChevronDown } from "lucide-react";
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
  const [openDemo, setOpenDemo] = useState(false);

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
          ? "bg-white/95 backdrop-blur-md shadow-sm py-5 md:py-4"
          : "bg-transparent py-6 md:py-8"}
      `}
    >
      <div className="w-full px-4 sm:px-6 xl:px-20 flex justify-between items-center relative">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 font-bold text-3xl md:text-4xl cursor-pointer z-50"
          onClick={() => navigate("/")}
        >
          <div
            className={`p-2 rounded-lg ${
              scrolled || mobileMenuOpen
                ? "bg-emerald-100 text-emerald-700"
                : "bg-white text-emerald-700"
            }`}
          >
            <Leaf size={26} className="fill-current" />
          </div>
          <span className={scrolled || mobileMenuOpen ? "text-gray-900" : "text-white"}>
            Agriassure
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className={`hidden md:flex gap-8 font-medium ${scrolled ? "text-gray-600" : "text-white"}`}>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/market")}>Marketplace</button>
          <button onClick={() => navigate("/rates")}>Mandi Rates</button>
          <button onClick={() => navigate("/prices")}>Contact us</button>
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <>
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-2">
                <User size={20} /> {user.name} ({user.role})
              </span>

              <button
                onClick={() => navigate(`/dashboard/${user.role}`)}
                className="px-5 py-2 bg-emerald-500 text-white rounded-full font-bold"
              >
                Dashboard
              </button>

              <button onClick={onLogout} className="text-gray-500 hover:text-red-500">
                <LogOut size={22} />
              </button>
            </>
          ) : (
            <>
            
              {/* LOGIN / DEMO DROPDOWN */}
<div
  className="relative"
  onMouseEnter={() => setOpenDemo(true)}
  onMouseLeave={() => setOpenDemo(false)}
>
  <button
    onClick={() => setOpenDemo((prev) => !prev)}
    className={`flex items-center gap-1 px-5 py-2 rounded-full font-semibold transition ${
      scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
    }`}
  >
    Log In <ChevronDown size={18} />
  </button>

  {openDemo && (
    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
      <button
        onClick={() => {
          onOpenLogin();
          setOpenDemo(false);
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 font-medium"
      >
        Log In
      </button>

      <div className="border-t my-1" />

      <button
        onClick={() => {
          onDemoLogin("farmer");
          setOpenDemo(false);
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Demo Farmer
      </button>
      <button
        onClick={() => {
          onDemoLogin("buyer");
          setOpenDemo(false);
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Demo Buyer
      </button>
      <button
        onClick={() => {
          onDemoLogin("admin");
          setOpenDemo(false);
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Demo Admin
      </button>
    </div>
  )}
</div>


              <button
                onClick={onOpenRegister}
                className="px-5 py-2 bg-emerald-500 text-white rounded-full font-bold"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} className={scrolled ? "text-black" : "text-white"} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-40 pt-24 px-6 md:hidden">
          <button onClick={() => navigate("/")} className="block border-b py-3">Home</button>
          <button onClick={() => navigate("/market")} className="block border-b py-3">Marketplace</button>
          <button onClick={() => navigate("/rates")} className="block border-b py-3">Mandi Rates</button>
          <button onClick={() => navigate("/contact")} className="block border-b py-3">Contact us</button>


          {!user && (
            <div className="mt-6 space-y-3">
              <button onClick={onOpenLogin} className="w-full py-3 border rounded-lg font-bold">
                Log In
              </button>
              <button onClick={() => onDemoLogin("farmer")} className="w-full py-3 border rounded-lg">
                Demo Farmer
              </button>
              <button onClick={() => onDemoLogin("buyer")} className="w-full py-3 border rounded-lg">
                Demo Buyer
              </button>
              <button onClick={() => onDemoLogin("admin")} className="w-full py-3 border rounded-lg">
                Demo Admin
              </button>
              <button onClick={onOpenRegister} className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold">
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;

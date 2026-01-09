// import React from "react";
// import { ChevronRight, Search } from "lucide-react";

// const Hero = ({ setActiveTab, user }) => (
//   <section className="relative min-h-screen bg-green-900 text-white overflow-hidden flex items-center">
    
//     {/* Background Image */}
//     <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"></div>

//     {/* Content */}
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//       <div className="max-w-3xl">

//         {/* Heading */}
//         <h1
//           className="
//             font-bold leading-tight mb-6
//             text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
//           "
//         >
//           Harvesting Trust, <br />
//           <span className="text-yellow-400">Delivering Prosperity</span>
//         </h1>

//         {/* Subheading */}
//         <p
//           className="
//             text-green-100 mb-8
//             text-base sm:text-lg md:text-xl lg:text-2xl
//           "
//         >
//           The digital bridge between farmers and buyers. Seamless trading, secure payments via Escrow.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          
//           <button
//             onClick={() =>
//               setActiveTab(user?.role === "farmer" ? "dashboard" : "market")
//             }
//             className="
//               bg-yellow-400 text-green-900
//               px-6 py-3 sm:px-8 sm:py-4
//               rounded-lg font-bold
//               text-base sm:text-lg lg:text-xl
//               hover:bg-yellow-300 transition
//               shadow-lg
//               flex items-center justify-center gap-2
//             "
//           >
//             {user?.role === "farmer" ? "Go to Dashboard" : "Start Trading"}
//             <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
//           </button>

//           <button
//             onClick={() => setActiveTab("market")}
//             className="
//               bg-transparent border-2 border-white
//               px-6 py-3 sm:px-8 sm:py-4
//               rounded-lg font-bold
//               text-base sm:text-lg lg:text-xl
//               hover:bg-white hover:text-green-900 transition
//               flex items-center justify-center gap-2
//             "
//           >
//             Browse Crops
//             <Search className="w-5 h-5 lg:w-6 lg:h-6" />
//           </button>

//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default Hero;
import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  TrendingUp, 
  Users, 
  Play, 
  Menu, 
  X,
  Sprout,
  Briefcase
} from 'lucide-react';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [activeRole, setActiveRole] = useState('farmer'); // 'farmer' or 'buyer'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Data for Interactive Section ---
  const roleContent = {
    farmer: {
      title: "For Farmers",
      heading: "Secure Your Harvest Before You Sow",
      description: "Stop worrying about fluctuating market prices. Lock in your profits with assured contracts and guaranteed payments.",
      points: [
        "Guaranteed Buy-back Agreements",
        "Zero Market Risk Price Protection",
        "Timely Payments via Escrow",
        "Access to Verified Corporate Buyers"
      ],
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop",
      cta: "Join as Farmer"
    },
    buyer: {
      title: "For Buyers",
      heading: "Reliable Supply Chain, Quality Assured",
      description: "Source directly from farmers with full traceability. Manage contracts, quality checks, and logistics in one platform.",
      points: [
        "Direct Farm-to-Factory Sourcing",
        "Traceable Quality Monitoring",
        "Digital Contract Management",
        "Hassle-free Bulk Procurement"
      ],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
      cta: "Join as Buyer"
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden selection:bg-emerald-200">
      
      {/* --- Navigation --- */}
      {/* <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
          <div className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tight z-50 relative">
            <div className={`p-1.5 md:p-2 rounded-lg ${scrolled || mobileMenuOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-emerald-700'}`}>
              <Leaf size={20} className="fill-current md:w-6 md:h-6" />
            </div>
            <span className={scrolled || mobileMenuOpen ? 'text-gray-900' : 'text-white'}>Agriassure</span>
          </div> */}

          {/* Desktop Menu */}
          {/* <div className={`hidden md:flex items-center gap-6 lg:gap-8 font-medium ${scrolled ? 'text-gray-600' : 'text-emerald-50'}`}>
            <a href="#features" className="hover:text-emerald-400 transition-colors text-sm lg:text-base">How it Works</a>
            <a href="#benefits" className="hover:text-emerald-400 transition-colors text-sm lg:text-base">Benefits</a>
            <a href="#testimonials" className="hover:text-emerald-400 transition-colors text-sm lg:text-base">Success Stories</a>
          </div>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <button className={`px-4 lg:px-5 py-2 rounded-full font-medium text-sm lg:text-base transition-colors ${scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              Log In
            </button>
            <button className="px-5 lg:px-6 py-2 lg:py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 active:scale-95 text-sm lg:text-base">
              Get Started
            </button>
          </div> */}

          {/* Mobile Toggle */}
          {/* <button 
            className="md:hidden z-50 p-2 rounded-md focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-gray-900" size={24} />
            ) : (
              <Menu className={scrolled ? 'text-gray-900' : 'text-white'} size={24} />
            )}
          </button>
        </div> */}

        {/* Mobile Menu Overlay */}
        {/* {mobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col pt-24 px-6 animate-fade-in md:hidden">
            <div className="flex flex-col gap-6 text-lg font-medium text-gray-800">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="border-b border-gray-100 pb-2">How it Works</a>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="border-b border-gray-100 pb-2">Benefits</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="border-b border-gray-100 pb-2">Success Stories</a>
              <div className="flex flex-col gap-3 mt-4">
                <button className="w-full py-3 rounded-lg border border-gray-200 font-bold text-gray-700">Log In</button>
                <button className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold shadow-lg">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </nav> */}

      {/* --- Hero Section --- */}
      <header className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
            alt="Agriculture Field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 text-center text-white space-y-6 md:space-y-8 pt-16 md:pt-20">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs md:text-lg font-semibold tracking-wide mb-4 md:mb-6 backdrop-blur-sm">
              🚀 Revolutionizing Contract Farming
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight mb-4 md:mb-6">
              Cultivating Trust,<br />
              <span className="text-emerald-400 bg-clip-text">Harvesting Stability.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-4xl text-gray-200 max-w-7xl mx-auto font-light leading-relaxed px-4">
              The bridge between hardworking farmers and reliable buyers. <br className="hidden md:block"/>
              Secure contracts, transparent payments, and a future you can count on.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up delay-200 px-4">
            <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-base md:text-lg shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group">
              Start Farming Contract
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2">
              <Play size={20} className="fill-current" /> Watch Demo
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="pt-8 md:pt-12 flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 animate-fade-in-up delay-500 text-sm md:text-base">
             <div className="flex items-center gap-2"><Shield size={18} className="md:w-[18px] md:h-[18px]"/> Secure Escrow</div>
             <div className="flex items-center gap-2"><CheckCircle size={18} className="md:w-[18px] md:h-[18px]"/> Legal Compliance</div>
             <div className="flex items-center gap-2"><Users size={18} className="md:w-[18px] md:h-[18px]"/> 10k+ Farmers</div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
           <ArrowRight className="rotate-90 w-5 h-5 md:w-6 md:h-6" />
        </div>
      </header>

      {/* --- Interactive "Choose Your Role" Section --- */}
      <section id="features" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-4">One Platform, Two Perspectives</h2>
            <p className="text-base md:text-3xl text-gray-600 max-w-6xl mx-auto px-2">Agriassure adapts to your needs. Select your role to see how we empower you.</p>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="bg-white p-1 rounded-full shadow-md border border-gray-200 inline-flex relative scale-90 md:scale-100 transform origin-center">
              <div 
                className={`absolute top-1 bottom-1 w-[180px] rounded-full bg-emerald-600 transition-all duration-300 ease-in-out ${activeRole === 'buyer' ? 'left-[148px]' : 'left-1'}`}
              ></div>
              <button 
                onClick={() => setActiveRole('farmer')}
                className={`relative z-10 w-[180px] py-3 rounded-full text-xl font-bold transition-colors flex items-center justify-center gap-2 ${activeRole === 'farmer' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Sprout size={25} /> I'm a Farmer
              </button>
              <button 
                onClick={() => setActiveRole('buyer')}
                className={`relative z-10 w-[180px] py-3 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2 ${activeRole === 'buyer' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Briefcase size={18} /> I'm a Buyer
              </button>
            </div>
          </div>

          {/* Interactive Content Card */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 transform">
            <div className="flex flex-col lg:flex-row">
              {/* Text Content */}
              <div className="lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center animate-fade-in order-2 lg:order-1">
                <span className="text-emerald-600 font-bold tracking-wider uppercase text-xs md:text-sm mb-3 md:mb-4">
                  {roleContent[activeRole].title}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  {roleContent[activeRole].heading}
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  {roleContent[activeRole].description}
                </p>
                
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {roleContent[activeRole].points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-emerald-100 rounded-full text-emerald-600 shrink-0">
                        <CheckCircle size={14} className="md:w-4 md:h-4" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm md:text-base">{point}</span>
                    </li>
                  ))}
                </ul>

                <button className="self-start px-6 md:px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                  {roleContent[activeRole].cta} <ArrowRight size={18} />
                </button>
              </div>

              {/* Image Content */}
              <div className="lg:w-1/2 relative min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] order-1 lg:order-2">
                <img 
                  key={activeRole} // Force re-render for animation
                  src={roleContent[activeRole].image} 
                  alt="Role Context" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/40 to-transparent lg:from-transparent lg:to-black/5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Value Props Grid --- */}
      <section id="benefits" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {[
              {
                icon: Shield,
                title: "Escrow Protection",
                desc: "Funds are locked safely in an RBI-compliant escrow account and only released when delivery is verified."
              },
              {
                icon: TrendingUp,
                title: "Stable Income",
                desc: "Farmers get guaranteed prices before sowing. Buyers get guaranteed supply volume. No surprises."
              },
              {
                icon: Leaf,
                title: "Sustainable Growth",
                desc: "We encourage sustainable farming practices by connecting eco-conscious buyers with organic farmers."
              }
            ].map((item, i) => (
              <div key={i} className="group p-6 md:p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 mb-4 md:mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <item.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      {/* <section className="py-16 md:py-24 bg-emerald-900 text-white relative overflow-hidden"> */}
        {/* Abstract Background Patterns */}
        {/* <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">Ready to transform your agriculture business?</h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 md:mb-12 max-w-2xl mx-auto">
            Join thousands of farmers and buyers building the future of contract farming today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-white text-emerald-900 rounded-full font-bold text-base md:text-lg hover:bg-emerald-50 transition-colors shadow-xl">
               Get Started Now
             </button>
             <button className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-transparent border border-emerald-700 text-white rounded-full font-bold text-base md:text-lg hover:bg-emerald-800 transition-colors">
               Contact Sales
             </button>
          </div>
        </div>
      </section> */}

      {/* --- Simple Footer --- */}
      {/* <footer className="bg-gray-900 text-gray-400 py-8 md:py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-white">
            <Leaf size={20} /> Agriassure
          </div>
          <div className="text-xs md:text-sm text-center md:text-left">
            &copy; 2024 Agriassure Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer> */}

    </div>
  );
}
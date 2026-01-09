// import React, { useState, useEffect } from "react";
// import Navigation from "./components/Navigation";
// import Hero from "./components/Hero";
// import HowItWorks from "./components/HowItWorks";
// import Footer from "./components/Footer";
// import Marketplace from "./components/MarketPlace";
// import RegistrationModal from "./components/RegistrationModal";
// import ContractSignModal from "./components/ContractSignModal";
// import PaymentModal from "./components/PaymentModal";
// import FarmerDashboard from "./pages/FarmerDashboard";
// import BuyerDashboard from "./pages/BuyerDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProcessTracker from "./components/ProcessTracker";
// import api from "./services/api";
// import { INITIAL_LISTINGS, INITIAL_PROPOSALS, MANDI_RATES } from "./data/mockData";
// import { 
//   Sprout, 
//   TrendingUp, 
//   Truck, 
//   ShieldCheck, 
//   Search, 
//   Menu, 
//   X, 
//   MapPin, 
//   Phone, 
//   User, 
//   Filter,
//   BarChart3,
//   Leaf,
//   Wheat,
//   ChevronRight,
//   FileText,
//   ClipboardList,
//   Bell,
//   LogOut,
//   CheckCircle,
//   Briefcase,
//   Users,
//   LayoutDashboard,
//   FileSignature,
//   Lock,
//   CreditCard,
//   PenTool,
//   Download,
//   History,
//   AlertCircle,
//   Clock,
//   Check
// } from 'lucide-react';

// const App = () => {
//   const [activeTab, setActiveTab] = useState('home');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   // simple small icon used in App (kept inline to avoid extra import)
//   const WheatIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600"><path d="M12 2v20" strokeWidth="2"/><path d="M7 7l10 10" strokeWidth="2"/></svg>;


//   // modals
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//   const [isContractOpen, setIsContractOpen] = useState(false);
//   const [isPaymentOpen, setIsPaymentOpen] = useState(false);
//   const [currentContract, setCurrentContract] = useState(null);

//   // data
//   const [listings, setListings] = useState(INITIAL_LISTINGS);
//   const [proposals, setProposals] = useState(INITIAL_PROPOSALS);

//   // registration - called from RegistrationModal after server responds or fallback
//   const handleRegistered = (userData) => {
//   setUser(userData);
//   setIsRegisterOpen(false);
//   setActiveTab('dashboard');
   
// };


//   const handleDemoLogin = (type) => {
//     if (type === 'farmer') setUser({ id: 'f1', name: 'Ram Kishan', role: 'farmer', location: 'Sehore, MP' });
//     else setUser({ id: 'b1', name: 'Fresh Foods Ltd', role: 'buyer', location: 'Mumbai' });
//     setActiveTab('dashboard');
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setActiveTab('home');
//   };

//   const handleSendProposal = async (proposalData) => {
//     const newProposal = {
//       id: Date.now(),
//       buyerId: user.id,
//       buyerName: user.name,
//       status: 'pending',
//       signatures: { farmer: false, buyer: false },
//       ...proposalData
//     };

//     try {
//       await api.sendProposal(newProposal);
//       // Ideally refetch proposals; for now push local
//       setProposals(prev => [newProposal, ...prev]);
//     } catch (err) {
//       console.warn("sendProposal API failed, using local state", err);
//       setProposals(prev => [newProposal, ...prev]);
//     }
//     alert("Proposal Sent to Farmer! Negotiation Started.");
//   };

//   const handleAcceptProposal = async (proposalId) => {
//     setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'accepted' } : p));
//     alert("Offer Accepted! Contract Drafting Initialized.");
//   };

//   const handleSignContract = (contractOrId) => {
//     const contract = typeof contractOrId === 'object' ? contractOrId : proposals.find(p => p.id === contractOrId);
//     setCurrentContract(contract);
//     setIsContractOpen(true);
//   };

//   const handleContractSigned = async (contractId) => {
//     setProposals(prev => prev.map(p => p.id === contractId ? { ...p, signatures: { ...p.signatures, [user.role]: true } } : p));
//     setIsContractOpen(false);
//     alert(`Contract Digitally Signed by ${user.role}!`);
//   };

//   const handleOpenPayment = (contract) => {
//     setCurrentContract(contract);
//     setIsPaymentOpen(true);
//   };

//   const handlePaymentComplete = async () => {
//     if (currentContract) {
//       setProposals(prev => prev.map(p => p.id === currentContract.id ? { ...p, status: 'escrow_funded' } : p));
//     }
//     setIsPaymentOpen(false);
//     alert("Payment Deposited in Escrow. Farmer notified.");
//   };

//   // In real app fetch listings & proposals from backend on mount
//   useEffect(() => {
//     const fetchRemote = async () => {
//       try {
//         const [lResp, pResp] = await Promise.all([api.fetchListings(), api.fetchProposals()]);
//         if (lResp?.data) setListings(lResp.data);
//         if (pResp?.data) setProposals(pResp.data);
//       } catch (err) {
//         // keep initial local data if backend not available
//         console.warn("Remote fetch failed — using local mock data", err);
//       }
//     };
//     fetchRemote();
//   }, []);

  
//   const renderContent = () => {
//     if (activeTab === 'home') return (
//       <>
//         <Hero setActiveTab={setActiveTab} user={user} />
//         <div className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
//           <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap justify-between items-center gap-4">
//             <div className="flex items-center gap-3">
//               <div className="bg-green-100 p-2 rounded-full"><WheatIcon /></div>
//               <div><p className="text-xs text-gray-500">Wheat (MP)</p><p className="font-bold text-gray-800">₹2,450 <span className="text-green-600 text-xs">▲ 2%</span></p></div>
//             </div>
//             <button onClick={() => setActiveTab('prices')} className="ml-auto text-green-600 font-bold hover:text-green-700 text-sm">View All Rates →</button>
//           </div>
//         </div>
//         <HowItWorks />
//       </>
//     );

//     if (activeTab === 'market') return <Marketplace listings={listings||[]} user={user} onSendProposal={handleSendProposal} />;

//     if (activeTab === 'dashboard') {
//       if (!user) return <div className="p-10 text-center">Please login first</div>;
//       if (user.role === 'farmer') return <FarmerDashboard user={user} listings={listings||[]} proposals={proposals||[]} onAddListing={(item) => setListings(prev => [item, ...prev])} onAcceptProposal={handleAcceptProposal} onSignContract={handleSignContract} />;
//       if (user.role === 'buyer') return <BuyerDashboard user={user} proposals={proposals||[]} onSignContract={handleSignContract} onOpenPayment={handleOpenPayment} />;
//       if (user.role === 'admin') return <AdminDashboard />;
//     }

//     if (activeTab === 'prices') return (
//       <div className="py-12 container mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-6">Mandi Rates</h2>
//         <div className="bg-white p-6 rounded-xl shadow">
//           {MANDI_RATES.map((r, i) => (
//             <div key={i} className="flex justify-between border-b py-3 last:border-0">
//                <span>{r.state} - {r.commodity}</span>
//                <span className="font-bold text-green-700">₹{r.max}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );

//     return null;
//   };

  

//   return (
//     <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
//       <Navigation 
//         activeTab={activeTab} 
//         setActiveTab={setActiveTab} 
//         mobileMenuOpen={mobileMenuOpen}
//         setMobileMenuOpen={setMobileMenuOpen}
//         user={user}
//         onLogout={handleLogout}
//         onOpenRegister={() => setIsRegisterOpen(true)}
//         onDemoLogin={handleDemoLogin}
//       />
      
//       <main className="flex-grow">
//         {renderContent()}
//       </main>

//       <Footer />

//       <RegistrationModal 
//         isOpen={isRegisterOpen} 
//         onClose={() => setIsRegisterOpen(false)} 
//         onRegisteredDemo={handleRegistered} 
//       />

//       <ContractSignModal 
//         isOpen={isContractOpen} 
//         onClose={() => setIsContractOpen(false)} 
//         contract={currentContract}
//         onSign={handleContractSigned}
//         user={user}
//       />

//       <PaymentModal
//         isOpen={isPaymentOpen}
//         onClose={() => setIsPaymentOpen(false)}
//         contract={currentContract}
//         onPaid={handlePaymentComplete}
//       />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import Marketplace from "./components/MarketPlace";
import RegistrationModal from "./components/RegistrationModal";
import ContractSignModal from "./components/ContractSignModal";
import PaymentModal from "./components/PaymentModal";
import LoginModal from "./components/loginModal";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import MandiTicker from "./components/MandiTicker";
import CategoryGrid from "./components/CategoryGrid";
import api from "./services/api";
import FarmerListings from "./sections/farmerSection/FarmerListings";
import AddListingForm from "./sections/farmerSection/AddListingForm";
//import { INITIAL_LISTINGS, INITIAL_PROPOSALS, MANDI_RATES } from "./data/mockData";
//import FarmerProposalCard from "./sections/farmerSection/FarmerProposalCard";
import FarmerProposals from "./sections/farmerSection/FarmerProposalCard";
import FarmerContractDetails from "./sections/farmerSection/FarmerContractDetails";
import FarmerContractPage from "./sections/farmerSection/FarmerContractPage";

import FarmerPayments from "./sections/farmerSection/FarmerPayments";

//import BuyerAnalytics from "./sections/buyerSection/BuyerAnalytics";
import BuyerContractDetails from "./sections/buyerSection/BuyerContractDetails";
import BuyerContractPage from "./sections/buyerSection/BuyerContractPage";
//import BuyerDelivery from "./sections/buyerSection/BuyerDelivery";
import BuyerEscrowPayment from "./sections/buyerSection/BuyerEscrowPaymentPage";
import BuyerOrders from "./sections/buyerSection/BuyerOrders";
import BuyerPaymentDetails from "./sections/buyerSection/BuyerPaymentDetails";

import BuyerDeliveryDashboard from "./sections/buyerSection/BuyerDeliveryDashboard";
import FarmerDeliveryDashboard from "./sections/farmerSection/FarmerDeliveryDashboard";
import BuyerEscrowPaymentPage from "./sections/buyerSection/BuyerEscrowPaymentPage";
//import ProgressOfBuyer from "./sections/buyerSection/ProgressOfBuyer";

  const App = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentContract, setCurrentContract] = useState(null);

  // data
  const [listings, setListings] = useState([]);
  //const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [marketplaceListings, setMarketplaceListings] = useState([]);
const fetchMarketplaceListings = async () => {
  try {
    console.log("[App] fetching marketplace listings");
    const resp = await api.getAllListings();
    setMarketplaceListings(resp.data.data || []);
  } catch (err) {
    console.error("[App] marketplace fetch failed", err);
  }
};

useEffect(() => {
  fetchMarketplaceListings();
}, []);
  // ✅ AFTER REGISTRATION → REDIRECT BASED ON ROLE
  const handleRegistered = (userData) => {
    setUser(userData);
    setIsRegisterOpen(false);

    if (userData.role === "farmer") navigate("/dashboard/farmer");
    if (userData.role === "buyer") navigate("/dashboard/buyer");
    if (userData.role === "admin") navigate("/dashboard/admin");
  };

  // demo login
  const handleDemoLogin = (type) => {
    if (type === "farmer") {
      setUser({ id: "f1", name: "Demo Farmer", role: "farmer", farmAddress: "Sehore, MP" });
      navigate("/dashboard/farmer");
    }
    if (type === "buyer") {
      setUser({ id: "b1", name: "Fresh Foods Ltd", role: "buyer",deliveryAddress: "Mumbai" });
      navigate("/dashboard/buyer");
    }
     if (type === "admin") {
      setUser({ id: "ad1", name: "Sagar", role: "admin", location: "bhopal" });
      navigate("/dashboard/admin");
    }
  };

  const handleLogin = (userData) => {
     console.log("Logged in user:", userData);
     setUser(userData);           // save logged-in user
     setIsLoginOpen(false);       // close modal
     navigate(`/dashboard/${userData.role}`);
};
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

// const handleListingCreated = (newListing) => {
//   setListings((prev) => [newListing, ...prev]);
// };

// const handleLogin = (userData) => {
//     console.log("🚀 Logged in user in App:", userData);

//     setUser(userData);

//     // 🔥 ROLE-BASED ROUTING
//     if (userData.role === "farmer") {
//       navigate("/dashboard/farmer");
//     } else if (userData.role === "buyer") {
//       navigate("/dashboard/buyer");
//     } else if (userData.role === "admin") {
//       navigate("/dashboard/admin");
//     }
//   };
const [proposals, setProposals] = useState([]);
const fetchProposals = async () => {
  const res = await api.getAllProposals(); // or buyer/farmer specific
  setProposals(res.data || []);
};
useEffect(() => {
  fetchProposals();
}, []);




  
const handleSendProposal = async (proposalData) => {
  console.log("📤 Sending proposal to backend", proposalData);
  const res = await api.createProposal(proposalData);
  setProposals((prev) => [res.data.proposal, ...prev]);
};

const handleUpdateProposalStatus = async (proposalId, status) => {
  try {
    const res = await api.updateProposalStatus(proposalId, status); 
    // ✅ IMPORTANT: re-fetch from DB
    await fetchProposals();
  } catch (err) {
    console.error("Failed to update proposal", err);
  }
};

 
// useEffect(() => {
//   api.fetchListings()
//     .then(res => setListings(res.data))
//     .catch(err => console.error(err));
// }, []);

useEffect(() => {
  console.log("🔄 Global proposals updated:", proposals);
}, [proposals]);


  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        onLogout={handleLogout}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onDemoLogin={handleDemoLogin}
      />

      <main className="grow">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero user={user} />
                <MandiTicker
            onViewAll={() => navigate("/prices")}
          />

          <CategoryGrid />

          <Features />

          <HowItWorks />

          <Testimonials />

          <CallToAction
            onRegister={() => setIsRegisterOpen(true)}
          />
        
              </>
            }
          />

          {/* MARKET */}
          <Route
            path="/market"
            element={<Marketplace 
            listings={marketplaceListings} 
            user={user} 
            onSendProposal={handleSendProposal}/>}
          />

          {/* DASHBOARDS */}
         
  <Route
    path="/dashboard/farmer"
    element={user?.role === "farmer" ? <FarmerDashboard 
    user={user} 
    proposals={proposals}   
    onSendProposal={handleSendProposal} 
    onUpdateProposalStatus={handleUpdateProposalStatus}
    refreshMarketplace={fetchMarketplaceListings}
    /> : <Navigate to="/" />}
     >
       {/* DEFAULT */}
  <Route index 
    element={<FarmerListings 
    // listings={listings} 
    user={user}
     />} 
    />

  <Route
    path="listings"
    element={<FarmerListings 
    // listings={listings} 
    user={user} />}
  />

  <Route
    path="add"
    element={<AddListingForm
      user={user}
      //onListingCreated={handleListingCreated}
    />
  }
/>
   <Route
  path="proposals"
  element={
    <FarmerProposals />
  }
/>


  {/* <Route
    path="proposals"
    element={<FarmerProposalCard 
    proposals={proposals} 
    user={user} />}
  /> */}

  <Route
       path="contracts"
       element={<FarmerContractDetails proposals={proposals} user={user} />}
  />
  <Route
       path="/dashboard/farmer/contracts/:contractId"
       element={<FarmerContractPage />}
/>
 <Route
        path="/dashboard/farmer/payments"
        element={<FarmerPayments />}
/>
<Route
  path="/dashboard/farmer/delivery"
  element={<FarmerDeliveryDashboard />}
/>
</Route>


          <Route
            path="/dashboard/buyer"
            element={
              user?.role === "buyer" ? (
                <BuyerDashboard 
                user={user} 
                proposals={proposals} />
              ) : (
                <Navigate to="/" />
              )
            }
            >
            {/* DEFAULT */}
                <Route index element={<BuyerOrders />} />
                 <Route
                    path="orders"
                    element={<BuyerOrders proposals={proposals} user={user} />}
                  />
                  <Route path="contracts" element={
                    <BuyerContractDetails />} />
                 

      
                   <Route path="contracts/:proposalId" element={<BuyerContractPage />} />
                   

                <Route
                       path="payments/:contractId"
                        element={<BuyerEscrowPaymentPage       
                        user={user} />}
                     />

                <Route
                       path="payments"
                        element={<BuyerPaymentDetails       
                        user={user} />}
                     />
                <Route
                       path="delivery"
                        element={<BuyerDeliveryDashboard       
                        user={user} />}
                     />


                    {/* <Route
                        path="analytics"
                         element={<BuyerAnalytics />}
                          /> */}
         </Route>

          

          <Route
            path="/dashboard/admin"
            element={
              user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />

      {/* MODALS */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisteredDemo={handleRegistered}
      />
       <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={(user) => {
          setUser(user);
           }}
          />

      <ContractSignModal
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
        contract={currentContract}
        user={user}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        contract={currentContract}
      />
    </div>
  );
};

export default App;


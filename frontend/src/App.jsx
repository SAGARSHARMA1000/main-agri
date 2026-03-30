import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import Marketplace from "./components/MarketPlace";
import MandiRates from "./components/MandiRates";
import WhyAgriassure from "./components/WhyAgriassure";
import ProblemSolution from "./components/ProblemSolution";
import ContactUsPage from "./components/layoutPages/ContactUsPage";

import RegistrationModal from "./components/RegistrationModal";
import LoginModal from "./components/LoginModal";

import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";

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
import PreFooterCTA from "./components/PreFooterCta";
import VideoModal from "./components/VideoModal";
//import ProgressOfBuyer from "./sections/buyerSection/ProgressOfBuyer";

  const App = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

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



useEffect(() => {
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
          <Hero user={user}
          onOpenRegister={() => setIsRegisterOpen(true)}
           />
          <WhyAgriassure />
          <ProblemSolution />
          {/* <CategoryGrid /> */}
          <HowItWorks onOpenRegister={() => setIsRegisterOpen(true)} />
          <Features />
          <MandiTicker/>
          <Testimonials setShowVideoModal={setShowVideoModal}/>
          <PreFooterCTA onOpenRegister={() => setIsRegisterOpen(true)} />
        {showVideoModal && (
     <VideoModal setShowVideoModal={setShowVideoModal} />
         )}

         
        
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

           <Route path="/rates" element={<MandiRates />} />
           <Route path="/contact" element={<ContactUsPage />} />

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

      

      
    </div>
  );
};

export default App;


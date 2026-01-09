import React from 'react';
import { Search, ChevronRight, Wheat, CloudRain, Sun, User, TrendingUp, FileSignature, Lock, CheckCircle, ShieldCheck, Truck, Star } from 'lucide-react';

const SunIcon = ({className}) => (<Sun className={className} />);
const CloudRainIcon = ({className}) => (<CloudRain className={className} />);

export const Hero = ({ setActiveTab }) => (
  <div className="relative bg-green-900 text-white overflow-hidden">
    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"></div>
    <div className="container mx-auto px-4 py-24 relative z-10">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Harvesting Trust, <br/>
          <span className="text-yellow-400">Delivering Prosperity</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-green-100">
          The digital bridge between farmers and buyers. Seamless trading, secure payments via Escrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setActiveTab('market')} 
            className="bg-yellow-400 text-green-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg flex justify-center items-center gap-2"
          >
            Start Trading <ChevronRight size={20}/>
          </button>
          <button onClick={() => setActiveTab('market')} className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-900 transition flex justify-center items-center gap-2">
            Browse Crops <Search size={20}/>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const MandiTicker = ({ setActiveTab }) => (
  <div className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap justify-between items-center gap-4 border-b-4 border-green-600">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full"><Wheat className="text-green-600"/></div>
          <div><p className="text-xs text-gray-500">Wheat (MP)</p><p className="font-bold text-gray-800">₹2,450 <span className="text-green-600 text-xs">▲ 2%</span></p></div>
        </div>
        <div className="hidden md:block w-px h-10 bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-full"><SunIcon className="text-yellow-600"/></div>
          <div><p className="text-xs text-gray-500">Mustard (RJ)</p><p className="font-bold text-gray-800">₹5,200 <span className="text-red-600 text-xs">▼ 1%</span></p></div>
        </div>
        <div className="hidden md:block w-px h-10 bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full"><CloudRainIcon className="text-blue-600"/></div>
          <div><p className="text-xs text-gray-500">Chana (MH)</p><p className="font-bold text-gray-800">₹4,800 <span className="text-green-600 text-xs">▲ 0.5%</span></p></div>
        </div>
        <button onClick={() => setActiveTab('prices')} className="ml-auto text-green-600 font-bold hover:text-green-700 text-sm">View All Rates →</button>
    </div>
  </div>
);

export const CategoryGrid = () => (
  <div className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Explore by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Grains', 'Pulses', 'Vegetables', 'Fruits', 'Spices', 'Oilseeds', 'Fiber', 'Dry Fruits'].map((cat, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="bg-gray-100 h-32 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition">
              <span className="text-4xl">🌾</span> {/* Using Emoji as placeholder for icons */}
            </div>
            <p className="text-center mt-2 font-bold text-gray-700 group-hover:text-green-700">{cat}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Features = () => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Agriassure?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">We provide an end-to-end ecosystem for agricultural trade, ensuring transparency, fair pricing, and secure payments.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border-b-4 border-green-500">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Secure Payments</h3>
          <p className="text-gray-600">Get guaranteed payments via Stripe or UPI escrow. Funds held securely until verified delivery.</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border-b-4 border-yellow-500">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Best Market Price</h3>
          <p className="text-gray-600">Access live mandi rates across India. Use our analytics to decide the best time and place to sell.</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border-b-4 border-blue-500">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Truck className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">End-to-End Logistics</h3>
          <p className="text-gray-600">We handle the pickup and delivery. Our logistics partners ensure your produce reaches the buyer safely.</p>
        </div>
      </div>
    </div>
  </div>
);

export const HowItWorks = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How Agriassure Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">From registration to secure payment release, we ensure every step is transparent and secure.</p>
      </div>

      <div className="grid md:grid-cols-6 gap-4 relative">
        <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-green-100 -z-10 transform -translate-y-1/2"></div>
        {[
          { icon: <User size={24}/>, title: 'Register', desc: 'Create account as Farmer or Buyer.' },
          { icon: <Search size={24}/>, title: 'List/Search', desc: 'Farmers list crops, buyers search.' },
          { icon: <TrendingUp size={24}/>, title: 'Negotiate', desc: 'Agree on price & quantity.' },
          { icon: <FileSignature size={24}/>, title: 'Contract', desc: 'E-sign digital legal contract.' },
          { icon: <Lock size={24}/>, title: 'Escrow', desc: 'Buyer funds held securely.' },
          { icon: <CheckCircle size={24}/>, title: 'Release', desc: 'Funds released after delivery.' }
        ].map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 z-10">
              {step.icon}
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-xs text-gray-500 px-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Testimonials = () => (
  <div className="py-16 bg-green-900 text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Trusted by 10,000+ Users</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-green-800 p-6 rounded-xl border border-green-700">
            <div className="flex gap-1 text-yellow-400 mb-4"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
            <p className="mb-4 italic">"Agriassure has completely changed how I sell my wheat. The payment is always on time thanks to the escrow system."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">R</div>
              <div>
                <p className="font-bold">Rajesh Kumar</p>
                <p className="text-xs text-green-300">Farmer, Madhya Pradesh</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CallToAction = ({ onRegister }) => (
  <div className="py-16 bg-yellow-50">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Agri Business?</h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">Join India's fastest growing digital agriculture marketplace today.</p>
      <button onClick={onRegister} className="bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-800 shadow-xl transition transform hover:-translate-y-1">
        Create Free Account
      </button>
    </div>
  </div>
);
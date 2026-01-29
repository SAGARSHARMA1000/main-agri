// components/Testimonials.jsx
import Counter from "./Counter";
import  {Star,Play, MapPin,
  Check
} from 'lucide-react';


const Testimonials = ({ setShowVideoModal }) => {
  return (
    <section id="testimonials" className="bg-slate-900 py-24 relative overflow-hidden text-white">
      {/* FULL testimonials + metrics JSX */}
      <section id="testimonials" className="bg-slate-900 py-24 relative overflow-hidden text-white">
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-emerald-500/20 rounded-full"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `particles ${Math.random() * 5 + 5}s linear infinite`
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Real Stories. Real Impact.</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { role: "Farmer", name: "Ramesh Pawar", loc: "Nashik, MH", quote: "With Agriassure, I don't worry about payments anymore. The escrow system is a lifesaver.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150" },
              { role: "Buyer", name: "Global Foods Ltd", loc: "Pune, MH", quote: "Sourcing quality produce has never been this transparent. We save 20% on procurement costs.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=150&h=150" },
              { role: "FPO Admin", name: "Suresh Patel", loc: "Gujrat", quote: "Managing 500+ farmers was chaos. Now it's all digital, tracked, and verified.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150" },
            ].map((t, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all hover:-translate-y-2 group">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full border-2 border-emerald-500 p-1 object-cover" />
                  <div>
                    <h4 className="font-bold text-lg">{t.name}</h4>
                    <p className="text-emerald-400 text-sm flex items-center gap-1"><MapPin size={12} /> {t.loc}</p>
                  </div>
                </div>
                <div className="mb-4 text-yellow-400 flex gap-1">
                  {[...Array(5)].map((_, star) => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 italic">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-xs font-bold bg-slate-800 px-3 py-1 rounded-full text-slate-400 uppercase tracking-wide">{t.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12">
            {[
              { label: "Farmers Onboarded", val: 10000, suffix: "+" },
              { label: "Transactions Secured", val: 120, suffix: " Cr+" },
              { label: "Successful Deals", val: 98, suffix: "%" },
              { label: "Fraud Cases", val: 0, suffix: "" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400 mb-2">
                  <Counter end={stat.val} suffix={stat.suffix} />
                </div>
                <p className="text-emerald-500 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-900/50 hover:scale-105"
            >
              <Play size={20} fill="currentColor" /> Watch Real Stories
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Testimonials;

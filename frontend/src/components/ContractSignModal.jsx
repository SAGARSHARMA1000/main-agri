import React from "react";
import { X, FileSignature, PenTool, ShieldCheck } from "lucide-react";
import api from "../services/api";

const ContractSignModal = ({ isOpen, onClose, contract, onSigned, user }) => {
  if (!isOpen || !contract) return null;

  const alreadySigned = (user?.role === 'farmer' && contract.signatures?.farmer) || 
                        (user?.role === 'buyer' && contract.signatures?.buyer);

  const handleSign = async () => {
    try {
      // Call backend sign endpoint (fallback to onSigned)
      await api.signContract(contract.id, { signer: user.role, userId: user.id });
      onSigned(contract.id);
    } catch (err) {
      console.warn("Sign API failed, applying local sign:", err);
      onSigned(contract.id);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center rounded-t-xl">
          <h3 className="font-bold text-lg flex items-center gap-2"><FileSignature size={20}/> Digital Contract Agreement</h3>
          <button onClick={onClose}><X size={20} className="text-gray-500 hover:text-black"/></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow bg-gray-50">
          <div className="bg-white p-8 shadow-sm border border-gray-200 min-h-[300px] text-sm relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-800">AGRIASSURE COMMODITY SALE AGREEMENT</h2>
              <p className="text-gray-500">Contract Reference: #{contract.id}</p>
              <p className="text-xs text-gray-400">Generated on: {new Date().toLocaleDateString()}</p>
            </div>
            
            {/* simplified contract text */}
            <div className="space-y-4 text-justify">
              <p><strong>PARTIES:</strong> Buyer: <strong>{contract.buyerName}</strong> — Seller: <strong>{contract.listing.seller}</strong></p>
              <p><strong>COMMODITY:</strong> {contract.listing.commodity} — Qty: {contract.quantity} — Price: ₹{contract.price} / Qtl</p>
              <p><strong>DELIVERY:</strong> {contract.date} at {contract.listing.location}</p>
              <p><strong>ESCROW:</strong> Buyer deposits to escrow. Release happens on verified delivery.</p>
            </div>

            <div className="mt-8 flex justify-between items-end gap-8">
              <div className="flex-1 text-center">
                 {contract.signatures?.buyer ? (
                    <div className="h-20 border-b border-black flex flex-col items-center justify-end pb-2">
                       <span className="font-dancing-script text-2xl text-blue-800 italic transform -rotate-3">{contract.buyerName}</span>
                       <span className="text-[10px] text-gray-400">Digitally Signed {new Date().toLocaleDateString()}</span>
                    </div>
                 ) : (
                    <div className="h-20 border-b border-black flex items-center justify-center text-gray-400 bg-gray-50 mb-2">
                       <span className="italic opacity-50">Pending Signature</span>
                    </div>
                 )}
                <p className="text-xs uppercase font-bold mt-2">Buyer Signature</p>
              </div>

              <div className="flex-1 text-center">
                 {contract.signatures?.farmer ? (
                    <div className="h-20 border-b border-black flex flex-col items-center justify-end pb-2">
                       <span className="font-dancing-script text-2xl text-green-800 italic transform -rotate-2">{contract.listing.seller}</span>
                       <span className="text-[10px] text-gray-400">Digitally Signed {new Date().toLocaleDateString()}</span>
                    </div>
                 ) : (
                    <div className="h-20 border-b border-black flex items-center justify-center text-gray-400 bg-gray-50 mb-2">
                       <span className="italic opacity-50">Pending Signature</span>
                    </div>
                 )}
                <p className="text-xs uppercase font-bold mt-2">Seller Signature</p>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
               <ShieldCheck size={300} />
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-white rounded-b-xl flex justify-between items-center">
          <div className="text-xs text-gray-500 flex items-center gap-1">
             <ShieldCheck size={14} className="text-green-600"/> 
             {contract.signatures?.buyer && contract.signatures?.farmer ? 
                "Contract Fully Executed & Binding" : 
                "Pending completion of all signatures"}
          </div>
          <div className="flex gap-3">
             <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-bold">Close</button>
             {!alreadySigned && (
               <button onClick={handleSign} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold flex items-center gap-2 shadow-lg">
                 <PenTool size={16}/> Click to Sign Digitally
               </button>
             )}
             {alreadySigned && (
               <button disabled className="px-6 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-bold flex items-center gap-2 cursor-not-allowed">
                 <PenTool size={16}/> You have Signed
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSignModal;

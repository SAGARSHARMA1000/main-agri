
// import React from "react";
// import { FileText, FileSignature, PenTool, ShieldCheck, CreditCard, Check } from "lucide-react";

// const ProcessTracker = ({ status, signatures = {} }) => {
//   let currentStep = 0;
//   if (status === 'pending') currentStep = 0;
//   else if (status === 'accepted') {
//     if (!signatures.farmer && !signatures.buyer) currentStep = 1;
//     else if (signatures.farmer && signatures.buyer) currentStep = 4;
//     else currentStep = 2;
//   } else if (status === 'escrow_funded') currentStep = 4;
//   else if (status === 'completed') currentStep = 5;

//   const steps = [
//     { label: 'Proposal', icon: FileText },
//     { label: 'Contract Draft', icon: FileSignature },
//     { label: 'Signing', icon: PenTool },
//     { label: 'Active', icon: ShieldCheck },
//     { label: 'Payment', icon: CreditCard },
//   ];

//   const progressPercent = `${(currentStep / (steps.length - 1)) * 100}%`;

//   return (
//     <div className="w-full py-4">
//       <div className="relative">
//         <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
//         <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 transition-all duration-500 -z-10" style={{ width: progressPercent }}></div>

//         <div className="flex justify-between items-center relative z-10">
//           {steps.map((step, idx) => {
//             const isCompleted = idx <= currentStep;
//             const isCurrent = idx === currentStep;
//             const Icon = step.icon;
//             return (
//               <div key={idx} className="flex flex-col items-center bg-white px-2">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isCompleted ? 'bg-green-500 border-green-500 text-white scale-110' : 'bg-white border-gray-300 text-gray-400'}`}>
//                   {isCompleted ? <Check size={14} /> : <Icon size={14} />}
//                 </div>
//                 <span className={`text-[10px] mt-1 font-bold ${isCurrent ? 'text-green-700' : 'text-gray-500'}`}>
//                   {step.label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-green-50 p-2 rounded border border-green-100">
//         <div className="flex items-center gap-2">
//            {signatures?.farmer ? <Check className="text-green-600" size={14}/> : <span className="text-gray-400">●</span>}
//            <span className={signatures?.farmer ? "text-green-800 font-bold" : "text-gray-500"}>Farmer Signed</span>
//         </div>
//         <div className="flex items-center gap-2">
//            {signatures?.buyer ? <Check className="text-green-600" size={14}/> : <span className="text-gray-400">●</span>}
//            <span className={signatures?.buyer ? "text-green-800 font-bold" : "text-gray-500"}>Buyer Signed</span>
//         </div>
//         <div className="flex items-center gap-2">
//            {(status === 'escrow_funded' || status === 'completed') ? <Check className="text-green-600" size={14}/> : <span className="text-gray-400">●</span>}
//            <span className={(status === 'escrow_funded' || status === 'completed') ? "text-green-800 font-bold" : "text-gray-500"}>Escrow Deposit</span>
//         </div>
//         <div className="flex items-center gap-2">
//            {status === 'completed' ? <Check className="text-green-600" size={14}/> : <span className="text-gray-400">●</span>}
//            <span className={status === 'completed' ? "text-green-800 font-bold" : "text-gray-500"}>Full Release</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProcessTracker;

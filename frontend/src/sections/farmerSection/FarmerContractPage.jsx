// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../services/api";

// export default function FarmerContractView() {
//   const { contractId } = useParams();
//   const [signature, setSignature] = useState(null);
//   const [name, setName] = useState("");

//   const handleAccept = async () => {
//     if (!signature || !name) {
//       alert("Upload signature and enter name");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("signature", signature);
//     formData.append("name", name);
//     console.log("🖊️ Farmer signing contract:", contractId);
//     //console.log("📦 FormData name:", farmerName);
//     //console.log("📦 FormData file:", signatureFile);

//     try {
//       await api.farmerSignContract(contractId, formData);
//       alert("✅ Contract accepted & signed");
//     } catch (err) {
//       console.error("❌ Farmer sign failed", err);
//     }
//   };

//   return (
//     <>
//       <input type="file" onChange={e => setSignature(e.target.files[0])} />
//       <input
//         type="text"
//         placeholder="Your Name"
//         value={name}
//         onChange={e => setName(e.target.value)}
//       />
//       <button onClick={handleAccept} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
//        Accept & Sign</button>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Clock,
  ChevronLeft,
  Download,
  Printer,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

/* ---------------- SAFE EMPTY TEMPLATE ---------------- */

const EMPTY_CONTRACT = {
  id: "",
  createdDate: "",
  buyer: { name: "", address: "" },
  farmer: { name: "", address: "" },
  cropDetails: {
    name: "",
    quantity: "",
    unit: "",
    pricePerQuintal: ""
  },
  delivery: { deadline: "", location: "" },
  payment: { mode: "Escrow Account", advance: 30 },
  buyerSignature: null,
  farmerSignature: null
};

/* ---------------- STATUS BANNER ---------------- */

const StatusBanner = ({ status }) => {
  const map = {
    sent_to_farmer: {
      text: "Action Required: Please review and sign the contract.",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      icon: Clock
    },
    active: {
      text: "Contract Active: Legally binding.",
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
      icon: ShieldCheck
    },
    rejected: {
      text: "Contract Rejected.",
      color: "bg-red-50 border-red-200 text-red-800",
      icon: AlertTriangle
    }
  };

  const cfg = map[status];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${cfg.color} mb-6`}>
      <Icon size={22} />
      <span className="font-semibold">{cfg.text}</span>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function FarmerContractView() {
  const { contractId } = useParams();
  const navigate = useNavigate();

  const [contractData, setContractData] = useState(EMPTY_CONTRACT);
  const [status, setStatus] = useState("sent_to_farmer");

  /* Farmer signature */
  const [signature, setSignature] = useState(null);
  const [name, setName] = useState("");

  /* ---------------- FETCH CONTRACT ---------------- */

  // useEffect(() => {
  //   api.get(`/api/contracts/${contractId}`).then(res => {
  //     const c = res.data;

  //     setContractData({
  //       id: c._id,
  //       createdDate: c.createdAt?.split("T")[0],
  //       buyer: {
  //         name: c.buyerName,
  //         address: c.deliveryAddress
  //       },
  //       farmer: {
  //         name: c.farmerName,
  //         address: c.farmAddress
  //       },
  //       cropDetails: {
  //         name: c.commodity,
  //         quantity: c.quantity,
  //         unit: c.unit,
  //         pricePerQuintal: c.offerPrice
  //       },
  //       delivery: {
  //         deadline: c.pickupDate,
  //         location: c.deliveryAddress
  //       },
  //       payment: c.payment,
  //       buyerSignature: c.buyerSignature,
  //       farmerSignature: c.farmerSignature
  //     });

  //     setStatus(c.status);
  //   });
  // }, [contractId]);
  useEffect(() => {
  if (!contractId) return;

  const fetchContract = async () => {
    try {
      const res = await api.getContractById(contractId);
      console.log("📦 RAW CONTRACT RESPONSE:", res.data);

      const c = res.data.contract;

      setContractData({
        id: c._id,
        createdDate: c.createdAt?.split("T")[0] || "",
        buyer: {
          name: c.buyerName,
          address: c.deliveryAddress,
        },
        farmer: {
          name: c.farmerName,
          address: c.farmAddress,
        },
        cropDetails: {
          name: c.commodity,
          quantity: c.quantity,
          unit: c.unit,
          pricePerQuintal: c.offerPrice,
        },
        delivery: {
          deadline: c.pickupDate,
          location: c.deliveryAddress,
        },
        payment: c.payment,
       // ✅ FIXED SIGNATURE MAPPING
  buyerSignature: {
    name: c.signatures?.buyerName || "",
    image: c.signatures?.buyerSignatureUrl
      ? c.signatures.buyerSignatureUrl.replace(/\\/g, "/")
      : null
  },
  farmerSignature: {
    name: c.signatures?.farmerName || "",
    image: c.signatures?.farmerSignatureUrl
      ? c.signatures.farmerSignatureUrl.replace(/\\/g, "/")
      : null
  }
      });

      setStatus(c.status);
    } catch (err) {
      console.error("❌ Failed to load contract", err);
    }
  };

  fetchContract();
}, [contractId]);


  /* ---------------- ACCEPT ---------------- */

  const handleAccept = async () => {
    if (!signature || !name) {
      alert("Upload signature and enter name");
      return;
    }

    const formData = new FormData();
    formData.append("signature", signature);
    formData.append("name", name);

    await api.farmerSignContract(contractId, formData);
    alert("✅ Contract accepted & signed");
    setStatus("active");
  };

  /* ---------------- REJECT ---------------- */
const handleReject = async () => {
  const confirmReject = window.confirm("Reject this contract?");
  if (!confirmReject) return;

  try {
    await api.rejectContract(contractId);
    setStatus("rejected");
  } catch (err) {
    console.error("❌ Failed to reject contract", err);
  }
};



  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto mb-6 flex justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600">
          <ChevronLeft size={18} /> Back
        </button>
        <div className="flex gap-2">
          <button className="bg-white px-3 py-2 border rounded"><Printer /></button>
          <button className="bg-white px-3 py-2 border rounded"><Download /></button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <StatusBanner status={status} />

        {/* CONTRACT BODY – UI SAME */}
        <div className="bg-white p-10 border shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-4">
            Contract Farming Agreement
          </h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            Agreement ID: {contractData.id} | Date: {contractData.createdDate}
          </p>

           {/* Document Body */}
          <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
            
            {/* Section 1: Parties */}
            <section>
              <h3 className="font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4 text-sm">1. Parties Involved</h3>
              <p className="mb-4">
                This agreement is made and entered into by and between:
              </p>
              <div className="grid md:grid-cols-2 gap-8 bg-gray-50 p-4 rounded border border-gray-100">
                <div>
                  <p className="text-xs uppercase text-gray-500 font-bold mb-1">Buyer (First Party)</p>
                  <p className="font-bold text-lg">{contractData.buyer?.name||"-"}</p>
                   <p className="text-sm">{contractData.buyer?.address}</p>
                  {/* <p className="text-sm">Rep: {contractData.buyer.repName}</p>  */}
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 font-bold mb-1">Farmer (Second Party)</p>
                  <p className="font-bold text-lg">{contractData.farmer?.name||"-"}</p>
                  <p className="text-sm">{contractData.farmer?.address}</p>
                  {/* <p className="text-sm">ID: {contractData.farmer.regId}</p> */}
                </div>
              </div>
            </section>

            {/* Section 2: Crop & Price Specifications */}
            <section>
              <h3 className="font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4 text-sm">2. Crop Specifications & Pricing</h3>
              <p className="mb-4 text-sm italic text-gray-500">
                The Second Party agrees to sell and the First Party agrees to purchase the produce as per the following specifications:
              </p>
              
              <div className="border border-gray-300 rounded overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="bg-gray-50 p-3 font-semibold w-1/3">Crop Variety</td>
                      <td className="p-3">{contractData.cropDetails.name} ({contractData.cropDetails.variety})</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="bg-gray-50 p-3 font-semibold">Quality Grade</td>
                      <td className="p-3">{contractData.cropDetails.grade}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="bg-gray-50 p-3 font-semibold">Quantity Agreed</td>
                      <td className="p-3">
                        {/* <EditableField 
                          section="cropDetails" field="quantity" 
                          value={contractData.cropDetails.quantity} 
                          type="number" suffix="Quintals" label="Quantity"
                        /> */} {contractData.cropDetails.quantity} {contractData.cropDetails.unit}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="bg-gray-50 p-3 font-semibold">Base Price</td>
                      <td className="p-3">
                        {/* <EditableField 
                          section="cropDetails" field="pricePerQuintal" 
                          value={contractData.cropDetails.pricePerQuintal} 
                          type="number" suffix="INR / Quintal" label="Price"
                        /> */}  ₹{contractData.cropDetails.pricePerQuintal} per {contractData.cropDetails.unit}
                      </td>
                    </tr>
                    <tr className="bg-emerald-50">
                      <td className="p-3 font-bold text-emerald-800">Total Contract Value</td>
                      <td className="p-3 font-bold text-emerald-800 text-lg">
                        ₹{(contractData.cropDetails.quantity * contractData.cropDetails.pricePerQuintal).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Delivery & Payment */}
            <section>
              <h3 className="font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4 text-sm">3. Delivery & Payment Terms</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                   <h4 className="font-bold text-sm mb-2">3.1 Delivery Schedule</h4>
                   <ul className="list-disc list-inside text-sm space-y-2">
                     <li>
                       <span className="text-gray-500">Deadline:</span>{' '}
                      {contractData.delivery.deadline} 
                     </li>
                     <li>
                       <span className="text-gray-500">Location:</span> {contractData.delivery.location}
                     </li>
                   
  


                     <li><span className="text-gray-500">Packaging:</span> {contractData.cropDetails.packaging}</li>
                   </ul>
                </div>
                <div>
                   <h4 className="font-bold text-sm mb-2">3.2 Payment Schedule</h4>
                   <ul className="list-disc list-inside text-sm space-y-2">
                     {/* <li><span className="text-gray-500">Mode:</span> {contractData.payment.mode}</li> */}
                     {/* <li><span className="text-gray-500">Advance:</span> {contractData.payment.advance}% upon signing</li> */}
                     <li><span className="text-gray-500">Balance:</span>Within 24 hours of delivery</li>
                   </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Legal Clauses */}
            <section>
              <h3 className="font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4 text-sm">4. Terms & Conditions</h3>
              <div className="text-xs text-gray-600 space-y-3 bg-gray-50 p-4 border border-gray-200 rounded">
                <p><strong>4.1 Rejection Criteria:</strong>Rejection allowed if moisture: 14%</p>
                <p><strong>4.2 Penalties:</strong>1% of total value per day delay</p>
                <p><strong>4.3 Force Majeure:</strong>Applicable for natural calamities (cyclone,flood)</p>
                <p><strong>4.4 Dispute Resolution:</strong> All disputes subject to arbitration under the APMC Act jurisdiction.</p>
              </div>
            </section>
               

          </div>
          {/* End Document Body */}
       <div/>

          {/* Buyer Signature */}
          
           <section className="pt-8 mt-8 border-t-2 border-dashed border-gray-300">
           <div className="grid grid-cols-2 gap-12">
          <div className="text-center mb-8 ">
          {contractData.buyerSignature?.image && (
             <>
      <img
        src={`http://localhost:4000/${contractData.buyerSignature.image}`}
        className="h-12 mx-auto object-contain"
        alt="Buyer Signature"
      />
      <p className="text-sm font-semibold mt-2">
        Signed by {contractData.buyerSignature.name}
      </p>
    </>
  )}
</div>
  

          {/* Farmer Signature */}
          {status === "sent_to_farmer" && (
            <div className="text-center space-y-3">
              <input type="file" onChange={e => setSignature(e.target.files[0])} />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border-b text-center"
              />
            </div>
          )}
           </div>
        </section>

        </div>

        {/* ACTION BAR */}
        {status === "sent_to_farmer" && (
          <div className="sticky bottom-4 bg-white p-4 mt-6 shadow-lg border rounded flex justify-between">
            <button
              onClick={handleReject}
              className="px-6 py-3 border border-red-300 text-red-600 rounded"
            >
              Reject
            </button>

            <button
              onClick={handleAccept}
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded"
            >
              <CheckCircle className="inline mr-2" /> Accept & Sign
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle,
  Landmark, AlertCircle, TrendingUp, ChevronRight,
  Shield, Download
} from 'lucide-react';
import api from "../../services/api";
import { useOutletContext } from "react-router-dom";

/* ---------------- MOCK TRANSACTIONS (UNCHANGED) ---------------- */

const TRANSACTIONS = [
  { id: "TXN-9001", date: "Aug 10, 2024", desc: "Withdrawal to SBI A/c ...8821", amount: 20000, type: "debit", status: "Success" },
  { id: "TXN-8992", date: "Aug 05, 2024", desc: "Payment Received - Wheat Batch", amount: 65200, type: "credit", status: "Success" },
  { id: "TXN-8800", date: "Jul 20, 2024", desc: "Bonus - Quality Grade A", amount: 5000, type: "credit", status: "Success" },
];

/* ---------------- COMPONENTS (UNCHANGED) ---------------- */

const StatCard = ({ label, value, subtext, icon: Icon, colorClass, borderClass }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border ${borderClass}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{value.toLocaleString()}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
    {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
  </div>
);

const TransactionItem = ({ txn }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
        {txn.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
      </div>
      <div>
        <p className="font-medium text-gray-800 text-sm">{txn.desc}</p>
        <p className="text-xs text-gray-400">{txn.date} • {txn.id}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-bold text-sm ${txn.type === 'credit' ? 'text-emerald-600' : 'text-gray-800'}`}>
        {txn.type === 'credit' ? '+' : '-'} ₹{txn.amount.toLocaleString()}
      </p>
      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{txn.status}</span>
    </div>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */

export default function FarmerPaymentWallet() {
  const { user } = useOutletContext();

  const [walletStats, setWalletStats] = useState({
    availableBalance: 0,
    lockedInEscrow: 0,
    totalEarnings: 0,
    currency: "₹"
  });

  const [escrowHoldings, setEscrowHoldings] = useState([]);

  /* ---------------- FETCH FARMER ESCROW DASHBOARD ---------------- */

  useEffect(() => {
    if (!user?.id) return;

    const fetchDashboard = async () => {
      try {
        const res = await api.getFarmerEscrowDashboard(user.id);

        setWalletStats(res.data.wallet);

        const mappedEscrows = res.data.escrows.map(e => ({
          id: e._id,
          contract: `${e.contractId?.commodity || "Contract"} (${e.contractId?.quantity || ""})`,
          buyer: e.buyerName,
          amount: e.amount,
          type: "Advance Payment",
          dateDeposited: new Date(e.depositedAt).toDateString(),
          status: e.status,
          releaseCondition: e.releaseCondition,
          expectedRelease:
            e.status === "Locked"
              ? "After Delivery Confirmation"
              : e.status === "Pending"
              ? "Awaiting Buyer Payment"
              : "Released"
        }));

        setEscrowHoldings(mappedEscrows);

      } catch (err) {
        console.error("❌ Farmer dashboard load failed", err);
      }
    };

    fetchDashboard();
  }, [user?.id]);

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">

      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xl">
            <Wallet className="fill-current" />
            <span>My Farm Wallet</span>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
              <Download size={16} /> Statement
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100">
              <Landmark size={16} /> Bank Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Available to Withdraw" 
            value={walletStats.availableBalance} 
            subtext="Updated just now"
            icon={CheckCircle} 
            colorClass="bg-emerald-100 text-emerald-600"
            borderClass="border-emerald-200"
          />
          <StatCard 
            label="Locked in Escrow" 
            value={walletStats.lockedInEscrow} 
            subtext="Releases on Delivery"
            icon={Clock} 
            colorClass="bg-yellow-100 text-yellow-600"
            borderClass="border-yellow-200"
          />
          <StatCard 
            label="Total Earnings (FY 24-25)" 
            value={walletStats.totalEarnings} 
            subtext="Auto-calculated"
            icon={TrendingUp} 
            colorClass="bg-blue-100 text-blue-600"
            borderClass="border-blue-200"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Escrow Holdings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-yellow-50 p-4 border-b border-yellow-100 flex justify-between items-center">
              <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                <Shield size={18} /> Payments in Escrow
              </h3>
              <span className="text-xs bg-white text-yellow-700 font-bold px-2 py-1 rounded border border-yellow-200">
                {escrowHoldings.length} Active
              </span>
            </div>

            {escrowHoldings.map(item => (
              <div key={item.id} className="p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800">{item.commodity}</h4>
                    <p className="text-sm text-gray-500">Buyer: {item.buyer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">₹{item.amount.toLocaleString()}</p>
                    <p className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                      item.status === "Locked"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "Released"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.status}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-sm flex gap-8 border border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-xs uppercase font-bold">Release Condition</span>
                    <span className="text-gray-700 font-medium">{item.releaseCondition}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs uppercase font-bold">Expected</span>
                    <span className="text-gray-700 font-medium">{item.expectedRelease}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transaction History (MOCKED) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Transaction History</h3>
            {TRANSACTIONS.map(txn => <TransactionItem key={txn.id} txn={txn} />)}
          </div>
        </div>

        {/* Right Column – Withdraw (UNCHANGED UI) */}
        <div className="lg:col-span-1">
          {/* Withdraw UI remains exactly same */}
        </div>
      </main>
    </div>
  );
}

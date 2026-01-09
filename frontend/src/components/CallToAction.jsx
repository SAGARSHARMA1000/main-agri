import React from "react";

const CallToAction = ({ onRegister }) => {
  return (
    <div className="py-16 bg-yellow-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Transform Your Agri Business?
        </h2>

        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Join India’s fastest growing digital agriculture marketplace today.
        </p>

        <button
          onClick={onRegister}
          className="bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-800 shadow-xl transition transform hover:-translate-y-1"
        >
          Create Free Account
        </button>
      </div>
    </div>
  );
};

export default CallToAction;

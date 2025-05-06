import React, { useState } from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyEMI, setMonthlyEMI] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (!P || !r || !n) {
      setMonthlyEMI(null);
      return;
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyEMI(emi.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Loan Calculator Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <input
            type="number"
            placeholder="Loan Amount"
            className="p-3 border border-gray-300 rounded-md"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            className="p-3 border border-gray-300 rounded-md"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Loan Term (Years)"
            className="p-3 border border-gray-300 rounded-md"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            onClick={calculateEMI}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Calculate
          </button>
        </div>

        {monthlyEMI && (
          <div className="mt-8 p-6 bg-green-100 border-l-4 border-green-500 text-center rounded">
            <h2 className="text-xl font-semibold text-green-800">
              Monthly EMI: ₹{monthlyEMI}
            </h2>
          </div>
        )}

        {/* Placeholder for future schedule table */}
        {monthlyEMI && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Amortization Schedule</h3>
            <p className="text-gray-500">Coming Soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;

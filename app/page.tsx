"use client";

import { useState } from 'react';

export default function Home() {
  const [inputs, setInputs] = useState({
    lotCost: 0,
    originationFee: 0,
    targetResalePrice: 0,
    permitCosts: 0,
    contingencyPercent: 10,
    designFees: 0,
    verticalBuildCost: 0,
    homeSize: 0,
    totalMargin: 20,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) || 0 });
  };

  const costsToSale = inputs.targetResalePrice * 0.06;
  const contingencyAmount = (inputs.verticalBuildCost * inputs.contingencyPercent) / 100;
  const monthlyDraw = inputs.verticalBuildCost * 0.3;
  const interestRate = 0.085;
  const loanInterest = Array.from({ length: 6 }, (_, i) => monthlyDraw * (i + 1))
    .reduce((sum, val) => sum + val, 0) * (interestRate / 12);

  const totalProjectCost =
    inputs.lotCost +
    inputs.originationFee +
    inputs.permitCosts +
    inputs.designFees +
    inputs.verticalBuildCost +
    contingencyAmount +
    costsToSale +
    loanInterest;

  const verticalCostPerSqFt = inputs.homeSize ? inputs.verticalBuildCost / inputs.homeSize : 0;
  const totalCostPerSqFt = inputs.homeSize ? totalProjectCost / inputs.homeSize : 0;

  const expectedProfit = inputs.targetResalePrice - totalProjectCost;
  const marginPercent = inputs.targetResalePrice
    ? (expectedProfit / inputs.targetResalePrice) * 100
    : 0;

  const inputFields = [
    { name: 'lotCost', label: 'Lot Cost' },
    { name: 'originationFee', label: 'Origination Fee' },
    { name: 'targetResalePrice', label: 'Target Resale Price' },
    { name: 'permitCosts', label: 'Permit Costs' },
    { name: 'designFees', label: 'Design Fees' },
    { name: 'verticalBuildCost', label: 'Vertical Build Cost' },
    { name: 'homeSize', label: 'Home Size (SqFt)' }
  ];

  return (
    <main className="max-w-md mx-auto p-4 space-y-6 text-sm">
      <h1 className="text-xl font-bold text-center mb-2">🏗️ Story Builders Cost Calculator</h1>

      <div className="space-y-3">
        {inputFields.map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              type="number"
              name={name}
              value={inputs[name]}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label htmlFor="contingencyPercent">Contingency %</label>
          <input
            type="number"
            name="contingencyPercent"
            value={inputs.contingencyPercent}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <p>🧾 Costs to Sale (6%): ${costsToSale.toFixed(0)}</p>
        <p>📄 Contingency: ${contingencyAmount.toFixed(0)}</p>
        <p>🏦 Loan Interest (6 mo @ 8.5%): ${loanInterest.toFixed(0)}</p>
        <p>📊 Total Project Cost: ${totalProjectCost.toFixed(0)}</p>
        <p>💰 Expected Profit: ${expectedProfit.toFixed(0)}</p>
        <p>📈 Margin: {marginPercent.toFixed(2)}%</p>
        <p>📐 Vertical Cost/SqFt: ${verticalCostPerSqFt.toFixed(0)}</p>
        <p>📐 Total Cost/SqFt: ${totalCostPerSqFt.toFixed(0)}</p>
      </div>
    </main>
  );
}

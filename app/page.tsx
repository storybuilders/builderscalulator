// app/page.tsx

"use client";

import { useState } from "react";
import Head from "next/head";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) || 0 });
  };

  const costsToSale = inputs.targetResalePrice * 0.06;
  const contingencyAmount = (inputs.verticalBuildCost * inputs.contingencyPercent) / 100;
  const monthlyDraw = inputs.verticalBuildCost * 0.3;
  const interestRate = 0.085;
  const loanInterest =
    Array.from({ length: 6 }, (_, i) => monthlyDraw * (i + 1)).reduce((sum, val) => sum + val, 0) *
    (interestRat

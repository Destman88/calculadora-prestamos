"use client";

import { useState } from "react";
import AmortizationCalculator from "./AmortizationCalculator";
import FixedInterestCalculator from "./FixedInterestCalculator";
import SimpleInterestCalculator from "./SimpleInterestCalculator";
import DecrementingSimpleInterestCalculator from "./DecrementingSimpleInterestCalculator";

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [numPayments, setNumPayments] = useState(0);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [startDate, setStartDate] = useState(new Date());
  const [calculationType, setCalculationType] = useState("fixed");
  const [showResults, setShowResults] = useState(false);

  const renderCalculator = () => {
    switch (calculationType) {
      case "amortization":
        return (
          <AmortizationCalculator
            principal={principal}
            annualInterestRate={annualInterestRate}
            numPayments={numPayments}
            paymentFrequency={paymentFrequency}
            startDate={startDate}
          />
        );
      case "simple":
        return (
          <SimpleInterestCalculator
            principal={principal}
            annualInterestRate={annualInterestRate}
            numPayments={numPayments}
            paymentFrequency={paymentFrequency}
            startDate={startDate}
          />
        );
      case "decrementingSimple":
        return (
          <DecrementingSimpleInterestCalculator
            principal={principal}
            annualInterestRate={annualInterestRate}
            numPayments={numPayments}
            paymentFrequency={paymentFrequency}
            startDate={startDate}
          />
        );
      case "fixed":
      default:
        return (
          <FixedInterestCalculator
            principal={principal}
            annualInterestRate={annualInterestRate}
            numPayments={numPayments}
            paymentFrequency={paymentFrequency}
            startDate={startDate}
          />
        );
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="mx-auto mt-6 max-w-xl sm:mt-20">
        <div className="grid grid-cols-3 gap-3">
          <label>
            Monto:
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className=" w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Interés (%):
            <input
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Cuotas:
            <input
              type="number"
              value={numPayments}
              onChange={(e) => setNumPayments(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3 my-5">
          <label>
            Amortización:
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="fixed">Interés Fijo</option>
              <option value="amortization">Cuota Fija</option>
              <option value="simple">Disminuir Cuota</option>
              <option value="decrementingSimple">Capitál al Final</option>
            </select>
          </label>
          <label>
            Modalidad:
            <select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="monthly">Mensual</option>
              <option value="biweekly">Quincenal</option>
              <option value="weekly">Semanal</option>
            </select>
          </label>
          <label>
            Primer Pago:
            <input
              type="date"
              value={startDate.toISOString().substring(0, 10)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        </div>
      </form>
      {showResults && renderCalculator()}
      <button
        type="button"
        onClick={handleCalculate}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Calcular
      </button>
    </div>
  );
};

export default LoanCalculator;

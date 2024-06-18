"use client";

import { useState } from "react";
import AmortizationCalculator from "./AmortizationCalculator";
import SimpleInterestCalculator from "./SimpleInterestCalculator";
import DecrementingSimpleInterestCalculator from "./DecrementingSimpleInterestCalculator";
import FixedInterestCalculator from "./FixedInterestCalculator";

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(10);
  const [numPayments, setNumPayments] = useState<number>(10);
  const [interestType, setInterestType] = useState<string>("amortization");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");

  return (
    <div>
      <h1>Loan Calculator</h1>
      <div>
        <label>
          Principal:
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Annual Interest Rate (%):
          <input
            type="number"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Number of Payments:
          <input
            type="number"
            value={numPayments}
            onChange={(e) => setNumPayments(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Interest Type:
          <select
            value={interestType}
            onChange={(e) => setInterestType(e.target.value)}
          >
            <option value="amortization">Amortization</option>
            <option value="simple">Simple Interest with Final Payment</option>
            <option value="decrementing">Decrementing Simple Interest</option>
            <option value="fixed">Fixed Interest</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Payment Frequency:
          <select
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="biweekly">Biweekly</option>
            <option value="weekly">Weekly</option>
          </select>
        </label>
      </div>
      {interestType === "amortization" && (
        <AmortizationCalculator
          principal={principal}
          annualInterestRate={annualInterestRate}
          numPayments={numPayments}
          paymentFrequency={paymentFrequency}
        />
      )}
      {interestType === "simple" && (
        <SimpleInterestCalculator
          principal={principal}
          annualInterestRate={annualInterestRate}
          numPayments={numPayments}
          paymentFrequency={paymentFrequency}
        />
      )}
      {interestType === "decrementing" && (
        <DecrementingSimpleInterestCalculator
          principal={principal}
          annualInterestRate={annualInterestRate}
          numPayments={numPayments}
          paymentFrequency={paymentFrequency}
        />
      )}
      {interestType === "fixed" && (
        <FixedInterestCalculator
          principal={principal}
          annualInterestRate={annualInterestRate}
          numPayments={numPayments}
          paymentFrequency={paymentFrequency}
        />
      )}
    </div>
  );
};

export default LoanCalculator;

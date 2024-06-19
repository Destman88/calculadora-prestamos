"use client";

import React, { useState, useEffect } from "react";
import { Payment, CalculatorProps } from "@/interfaces/interfaces";
import PaymentDateCalculator from "./PaymentDateCalculator";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const AmortizationCalculator: React.FC<CalculatorProps> = ({
  principal,
  annualInterestRate,
  numPayments,
  paymentFrequency,
  startDate,
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentDates, setPaymentDates] = useState<Date[]>([]);

  useEffect(() => {
    if (paymentDates.length > 0) {
      calculateAmortizationPayments();
    }
  }, [paymentDates]);

  const handlePaymentDates = (dates: Date[]) => {
    setPaymentDates(dates);
  };

  const calculateAmortizationPayments = () => {
    const monthlyInterestRate = annualInterestRate / 100;
    const paymentAmount =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
    const calculatedPayments: Payment[] = [];
    let remainingPrincipal = principal;

    paymentDates.forEach((date, index) => {
      const interestPayment = remainingPrincipal * monthlyInterestRate;
      const principalPayment = paymentAmount - interestPayment;

      calculatedPayments.push({
        no: index + 1,
        date: date.toLocaleDateString(),
        totalToPay: paymentAmount,
        capitalPending: remainingPrincipal,
        capitalPayment: principalPayment,
        interest: interestPayment,
      });
      remainingPrincipal -= principalPayment;
    });

    setPayments(calculatedPayments);
  };
  return (
    <div>
      <PaymentDateCalculator
        startDate={startDate}
        numPayments={numPayments}
        paymentFrequency={paymentFrequency}
        onCalculateDates={handlePaymentDates}
      />
      {/* <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Total a Pagar</th>
            <th className="py-2 px-4 border-b">Capital Pendiente</th>
            <th className="py-2 px-4 border-b">Abono al Capital</th>
            <th className="py-2 px-4 border-b">Interés</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.no}>
              <td className="py-2 px-4 border-b">{payment.no}</td>
              <td className="py-2 px-4 border-b">{payment.date}</td>
              <td className="py-2 px-4 border-b">
                {payment.totalToPay.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">
                {payment.capitalPending.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">
                {payment.capitalPayment.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">
                {payment.interest.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default AmortizationCalculator;

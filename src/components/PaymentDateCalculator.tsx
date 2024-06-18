"use client";

import { PaymentDateCalculatorProps } from "@/interfaces/interfaces";
import { useEffect } from "react";

const PaymentDateCalculator: React.FC<PaymentDateCalculatorProps> = ({
  startDate,
  numPayments,
  paymentFrequency,
  onCalculateDates,
}) => {
  useEffect(() => {
    const dates = calculatePaymentDates();
    onCalculateDates(dates);
  }, [startDate, numPayments, paymentFrequency]);

  const calculatePaymentDates = (): Date[] => {
    const dates: Date[] = [];
    let date = new Date(startDate);

    for (let i = 1; i <= numPayments; i++) {
      switch (paymentFrequency) {
        case "monthly":
          date.setMonth(date.getMonth() + 1);
          break;
        case "biweekly":
          date.setDate(date.getDate() + 14);
          break;
        case "weekly":
          date.setDate(date.getDate() + 7);
          break;
      }
      dates.push(new Date(date));
    }

    return dates;
  };

  return null; // This component doesn't render anything
};

export default PaymentDateCalculator;

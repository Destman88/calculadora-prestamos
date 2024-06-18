export interface Payment {
  no: number;
  date: string;
  totalToPay: number;
  capitalPending: number;
  capitalPayment: number;
  interest: number;
}

export interface CalculatorProps {
  principal: number;
  annualInterestRate: number;
  numPayments: number;
  paymentFrequency: string;
  startDate: Date;
}

export interface PaymentDateCalculatorProps {
  startDate: Date;
  numPayments: number;
  paymentFrequency: string;
  onCalculateDates: (dates: Date[]) => void;
}

import LoanCalculator from "@/components/LoanCalculator";

export default function Home() {
  return (
    <div className="h-screen">
      <h1 className="text-center text-2xl font-extrabold">
        Calculadora de Intereses
      </h1>
      <LoanCalculator />
    </div>
  );
}

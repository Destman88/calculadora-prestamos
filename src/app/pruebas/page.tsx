"use client";

import { useState } from "react";

import AmortizationCalculator from "@/components/AmortizationCalculator";
import DecrementingSimpleInterestCalculator from "@/components/DecrementingSimpleInterestCalculator";
import FixedInterestCalculator from "@/components/FixedInterestCalculator";
import SimpleInterestCalculator from "@/components/SimpleInterestCalculator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const formSchema = z.object({
  monto: z.number().min(1, { message: "El monto debe ser mayor a 0." }),
  interes: z.number().min(1, { message: "El interés debe ser mayor a 0." }),
  cuotas: z.number().min(1, { message: "Las cuotas deben ser mayor a 0." }),
  amortizacion: z.string(),
  modalidad: z.string(),
  primerPago: z.date(),
});

const LoanCalculatorPR: React.FC = () => {
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

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monto: 0,
      interes: 0,
      cuotas: 0,
      amortizacion: "",
      modalidad: "",
      primerPago: new Date(),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-6 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interés (%):</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={annualInterestRate}
                      onChange={(e) =>
                        setAnnualInterestRate(Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cuotas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuotas:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={numPayments}
                      onChange={(e) => setNumPayments(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 my-5">
            <FormField
              control={form.control}
              name="amortizacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amortización:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        setCalculationType(value as string)
                      }
                      defaultValue={calculationType}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de amortización" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fixed">Interés Fijo</SelectItem>
                        <SelectItem value="amortization">Cuota Fija</SelectItem>
                        <SelectItem value="simple">Disminuir Cuota</SelectItem>
                        <SelectItem value="decrementingSimple">
                          Capitál al Final
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modalidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modalidad:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        setPaymentFrequency(value as string)
                      }
                      defaultValue={paymentFrequency}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione modalidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Mensual</SelectItem>
                        <SelectItem value="biweekly">Quincenal</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="primerPago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer Pago:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          {startDate ? (
                            format(startDate, "PPP", { locale: es })
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        locale={es}
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                          setStartDate(date as Date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      {showResults && renderCalculator()}
      <Button onClick={handleCalculate} className="mt-2 p-2" type="submit">
        Calcular
      </Button>
    </div>
  );
};

export default LoanCalculatorPR;

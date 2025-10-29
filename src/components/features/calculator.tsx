"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency } from "@/lib/utils";

const calculatorSchema = z.object({
  propertyPrice: z.number().min(50000).max(5000000),
  deposit: z.number().min(0),
  rate: z.number().min(0).max(15),
  term: z.number().min(5).max(40),
  productType: z.enum(["fixed", "variable"]),
  repaymentType: z.enum(["repayment", "interest-only"])
});

type CalculatorInput = z.infer<typeof calculatorSchema>;

type NumericField = {
  name: "propertyPrice" | "deposit" | "rate" | "term";
  label: string;
  min: number;
  max: number;
  step: number;
  variant: "range" | "number";
};

const sliderFields: NumericField[] = [
  { name: "propertyPrice", label: "Property price", min: 50000, max: 5000000, step: 5000, variant: "range" },
  { name: "deposit", label: "Deposit", min: 0, max: 2000000, step: 5000, variant: "range" }
];

const numberFields: NumericField[] = [
  { name: "rate", label: "Rate %", min: 0, max: 15, step: 0.1, variant: "number" },
  { name: "term", label: "Term (years)", min: 5, max: 40, step: 1, variant: "number" }
];

const defaultValues: CalculatorInput = {
  propertyPrice: 450000,
  deposit: 90000,
  rate: 4.2,
  term: 25,
  productType: "fixed",
  repaymentType: "repayment"
};

function calcRepayment(p: number, rate: number, years: number) {
  const r = rate / 100 / 12;
  const n = years * 12;
  if (r === 0) return p / n;
  return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function Calculator() {
  const [values, setValues] = useState(defaultValues);
  const form = useForm<CalculatorInput>({
    resolver: zodResolver(calculatorSchema),
    defaultValues
  });

  const loanAmount = useMemo(() => values.propertyPrice - values.deposit, [values.propertyPrice, values.deposit]);
  const monthlyPayment = useMemo(() => {
    if (values.repaymentType === "interest-only") {
      return (loanAmount * (values.rate / 100)) / 12;
    }
    return calcRepayment(loanAmount, values.rate, values.term);
  }, [loanAmount, values.rate, values.term, values.repaymentType]);
  const totalRepayment = useMemo(() => monthlyPayment * values.term * 12, [monthlyPayment, values.term]);
  const totalInterest = useMemo(() => totalRepayment - loanAmount, [totalRepayment, loanAmount]);
  const ltv = useMemo(() => Math.round((loanAmount / values.propertyPrice) * 100), [loanAmount, values.propertyPrice]);

  const updateNumber = (key: NumericField["name"], value: number) => {
    const next = { ...values, [key]: value } as CalculatorInput;
    setValues(next);
    form.setValue(key as keyof CalculatorInput, value as any);
  };

  const updateSelect = <Key extends "productType" | "repaymentType">(key: Key, value: CalculatorInput[Key]) => {
    const next = { ...values, [key]: value } as CalculatorInput;
    setValues(next);
    form.setValue(key as keyof CalculatorInput, value as any);
  };

  return (
    <section
      id="calculator"
      className="rounded-[2.5rem] bg-white p-8 shadow-soft transition-transform duration-200 motion-safe:hover:-translate-y-1"
    >
      <form className="grid gap-6 lg:grid-cols-[2fr,1fr]" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-6">
          <h2 className="text-3xl font-display text-charcoal">Mortgage calculator</h2>
          <p className="text-slate-600">
            Adjust the inputs to explore repayment scenarios. Saving an account lets you store and share scenarios with your
            adviser.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {sliderFields.map((field) => (
              <div
                key={field.name}
                className="space-y-4 rounded-2xl border border-transparent p-2 transition-shadow duration-200 focus-within:border-primary/60 focus-within:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <span className="font-semibold text-primary">{formatCurrency(values[field.name])}</span>
                </div>
                <input
                  id={field.name}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.name]}
                  onChange={(event) => updateNumber(field.name, Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-primary"
                />
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {numberFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 transition-shadow duration-200 focus:border-primary focus:outline-none focus:shadow-soft"
                  value={values[field.name]}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                  onChange={(event) => updateNumber(field.name, Number(event.target.value))}
                />
              </div>
            ))}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Product type</label>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 transition-shadow duration-200 focus:border-primary focus:outline-none focus:shadow-soft"
                value={values.productType}
                onChange={(event) => updateSelect("productType", event.target.value as CalculatorInput["productType"])}
              >
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Repayment type</label>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 transition-shadow duration-200 focus:border-primary focus:outline-none focus:shadow-soft"
                value={values.repaymentType}
                onChange={(event) => updateSelect("repaymentType", event.target.value as CalculatorInput["repaymentType"])}
              >
                <option value="repayment">Capital & interest</option>
                <option value="interest-only">Interest-only</option>
              </select>
            </div>
          </div>
        </div>
        <aside className="glass flex flex-col gap-6 rounded-3xl p-6 transition-transform duration-200 motion-safe:hover:-translate-y-1">
          <h3 className="text-xl font-display text-charcoal">Results</h3>
          <div className="grid gap-4 text-sm">
            <ResultRow label="Loan to value" value={`${ltv}%`} alert={ltv > 85 ? "High LTV may limit lenders" : undefined} />
            <ResultRow label="Loan amount" value={formatCurrency(loanAmount)} />
            <ResultRow label="Monthly payment" value={formatCurrency(monthlyPayment)} />
            <ResultRow label="Total repayment" value={formatCurrency(totalRepayment)} />
            <ResultRow label="Total interest" value={formatCurrency(totalInterest)} />
            {values.repaymentType === "interest-only" ? (
              <p className="rounded-2xl bg-accent/10 p-3 text-xs text-charcoal">
                Interest-only requires an exit plan. Consider switching to repayment to reduce principal.
              </p>
            ) : null}
            {values.deposit < values.propertyPrice * 0.05 ? (
              <p className="rounded-2xl bg-rose-100 p-3 text-xs text-rose-700">
                Deposits below 5% may not qualify for mainstream lending. Speak to an adviser for specialist options.
              </p>
            ) : null}
          </div>
          <div className="rounded-2xl bg-primary/10 p-4 text-xs text-charcoal">
            APRs are illustrative. Actual offers depend on affordability, credit profile, and lender underwriting.
          </div>
        </aside>
      </form>
    </section>
  );
}

function ResultRow({ label, value, alert }: { label: string; value: string; alert?: string }) {
  return (
    <div className="rounded-2xl border border-transparent p-2 transition-colors duration-200 focus-within:border-primary/50">
      <div className="flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{label}</span>
        <span className="font-semibold text-primary">{value}</span>
      </div>
      {alert ? <p className="mt-1 text-xs text-amber-600">{alert}</p> : null}
    </div>
  );
}

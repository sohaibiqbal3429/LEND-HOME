"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { dispatchToast } from "@/components/ui/toaster";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Phone is required"),
  propertyPrice: z.string(),
  deposit: z.string(),
  incomeBand: z.enum(["<50k", "50-100k", "100-250k", ">250k"]) 
});

type LeadInput = z.infer<typeof leadSchema>;

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema)
  });

  const onSubmit = async (data: LeadInput) => {
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          propertyPrice: Number(data.propertyPrice),
          deposit: Number(data.deposit)
        })
      });
      dispatchToast({ title: "Thanks, we’ll be in touch", description: "An adviser will contact you within 10 minutes." });
      reset();
    } catch (error) {
      console.error(error);
      dispatchToast({ title: "Something went wrong", description: "Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="prequal" className="glass rounded-3xl p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <h3 className="text-2xl font-display text-charcoal">Start your pre-qualification</h3>
        <p className="text-sm text-slate-600">We'll call you within 10 minutes with tailored next steps.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          { name: "name", label: "Full name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "tel" },
          { name: "propertyPrice", label: "Property price (£)", type: "number" },
          { name: "deposit", label: "Deposit (£)", type: "number" }
        ].map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              id={field.name}
              {...register(field.name as keyof LeadInput)}
              type={field.type}
              className="rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
              inputMode={field.type === "number" ? "numeric" : undefined}
              step={field.type === "number" ? "1" : undefined}
              aria-invalid={!!errors[field.name as keyof LeadInput]}
            />
            {errors[field.name as keyof LeadInput] ? (
              <span className="text-xs text-rose-600">
                {errors[field.name as keyof LeadInput]?.message as string}
              </span>
            ) : null}
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Income band</label>
          <select
            {...register("incomeBand")}
            className="rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
            defaultValue="50-100k"
          >
            <option value="<50k">Under £50k</option>
            <option value="50-100k">£50k - £100k</option>
            <option value="100-250k">£100k - £250k</option>
            <option value=">250k">Above £250k</option>
          </select>
        </div>
      </div>
      <Button className="mt-6 w-full" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </Button>
      <p className="mt-3 text-xs text-slate-500">
        By submitting you agree to our <a href="/privacy">Privacy Policy</a> and FCA-compliant terms.
      </p>
    </form>
  );
}


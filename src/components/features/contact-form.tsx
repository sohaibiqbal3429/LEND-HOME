"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { dispatchToast } from "@/components/ui/toaster";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  consent: z.boolean().refine((value) => value, "Consent is required")
});

type ContactInput = z.infer<typeof schema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactInput>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      dispatchToast({ title: "Message sent", description: "We'll respond shortly." });
      reset();
    } catch (error) {
      console.error(error);
      dispatchToast({ title: "Something went wrong", description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass grid gap-6 rounded-3xl p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            {...register("phone")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
          />
        </Field>
        <Field label="Message" error={errors.message?.message} className="md:col-span-2">
          <textarea
            {...register("message")}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary"
          />
        </Field>
      </div>
      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          {...register("consent", { setValueAs: (value) => value === true || value === "on" })}
          className="mt-1"
        />
        <span>I consent to LENDLY contacting me about financial services. You can withdraw consent at any time.</span>
      </label>
      {errors.consent ? <p className="text-xs text-rose-600">{errors.consent.message}</p> : null}
      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}


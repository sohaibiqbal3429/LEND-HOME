"use client";

import * as React from "react";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

const toastVariants = "glass px-6 py-4 rounded-2xl shadow-soft";

export function Toaster() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<{ title?: string; description?: string } | null>(null);

  React.useEffect(() => {
    const handler = (event: CustomEvent<{ title?: string; description?: string }>) => {
      setMessage(event.detail);
      setOpen(true);
    };
    window.addEventListener("lendly:toast", handler as EventListener);
    return () => window.removeEventListener("lendly:toast", handler as EventListener);
  }, []);

  return (
    <ToastProvider swipeDirection="right">
      <Toast className={cn(toastVariants)} open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-1">
          {message?.title ? <ToastTitle className="font-semibold text-primary">{message.title}</ToastTitle> : null}
          {message?.description ? <ToastDescription>{message.description}</ToastDescription> : null}
        </div>
        <ToastClose aria-label="Close" className="ml-auto text-sm text-slate-500 hover:text-slate-900">
          Close
        </ToastClose>
      </Toast>
      <ToastViewport className="fixed bottom-6 right-6 z-[9999]" />
    </ToastProvider>
  );
}

export function dispatchToast(payload: { title?: string; description?: string }) {
  window.dispatchEvent(new CustomEvent("lendly:toast", { detail: payload }));
}

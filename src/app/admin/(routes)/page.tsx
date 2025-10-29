export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { connectMongo } from "@/lib/mongoose";
import { Message } from "@/models/Message";
import { Lead } from "@/models/Lead";

function formatDate(date: Date) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export default async function AdminOverviewPage() {
  await connectMongo();
  const latestMessages = await Message.find({}).sort({ createdAt: -1 }).limit(5).lean();
  const latestLeads = await Lead.find({}).sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className="container space-y-10 py-16">
      <h1 className="text-3xl font-display text-charcoal">Admin overview</h1>
      <p className="text-slate-600">
        Monitor leads, pipeline health, and content. Below are the latest contact messages.
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest messages</h2>
          <Link href="/admin/messages" className="text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {latestMessages.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-slate-600" colSpan={4}>
                    No messages yet.
                  </td>
                </tr>
              ) : (
                latestMessages.map((m: any) => (
                  <tr key={m._id} className="border-t border-slate-100">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(new Date(m.createdAt))}</td>
                    <td className="px-4 py-3">{m.name || "—"}</td>
                    <td className="px-4 py-3">{m.email}</td>
                    <td className="px-4 py-3 max-w-xl">
                      <div className="line-clamp-2">{m.message}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest leads</h2>
          <Link href="/admin/leads" className="text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestLeads.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-slate-600" colSpan={4}>
                    No leads yet.
                  </td>
                </tr>
              ) : (
                latestLeads.map((l: any) => (
                  <tr key={l._id} className="border-t border-slate-100">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(new Date(l.createdAt))}</td>
                    <td className="px-4 py-3">{l.name || "—"}</td>
                    <td className="px-4 py-3">{l.email}</td>
                    <td className="px-4 py-3">{l.status || "NEW"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectMongo } from "@/lib/mongoose";
import { Lead } from "@/models/Lead";

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `£${n}`;
  }
}

function formatDate(date: Date) {
  try {
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
  } catch {
    return date.toISOString();
  }
}

export default async function AdminLeadsPage() {
  await connectMongo();
  const leads = await Lead.find({}).sort({ createdAt: -1 }).limit(200).lean();

  return (
    <div className="container space-y-10 py-16">
      <h1 className="text-3xl font-display text-charcoal">Admin leads</h1>
      {leads.length === 0 ? (
        <p className="text-slate-600">No leads yet. Submissions from the home page form will appear here.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Deposit</th>
                <th className="px-4 py-3">Income</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l: any) => (
                <tr key={l._id} className="border-t border-slate-100">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(new Date(l.createdAt))}</td>
                  <td className="px-4 py-3">{l.name || "—"}</td>
                  <td className="px-4 py-3">{l.email}</td>
                  <td className="px-4 py-3">{l.phone || "—"}</td>
                  <td className="px-4 py-3">{formatCurrency(Number(l.propertyPrice))}</td>
                  <td className="px-4 py-3">{formatCurrency(Number(l.deposit))}</td>
                  <td className="px-4 py-3">{l.incomeBand || "—"}</td>
                  <td className="px-4 py-3">{l.status || "NEW"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

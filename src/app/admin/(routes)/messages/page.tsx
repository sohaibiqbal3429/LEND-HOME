export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectMongo } from "@/lib/mongoose";
import { Message } from "@/models/Message";

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

export default async function AdminMessagesPage() {
  await connectMongo();
  const messages = await Message.find({}).sort({ createdAt: -1 }).limit(200).lean();

  return (
    <div className="container space-y-8 py-16">
      <h1 className="text-3xl font-display text-charcoal">Admin messages</h1>
      {messages.length === 0 ? (
        <p className="text-slate-600">No messages yet. Submissions from the contact form will appear here.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Consent</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m: any) => (
                <tr key={m._id} className="border-t border-slate-100">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(new Date(m.createdAt))}</td>
                  <td className="px-4 py-3">{m.name || "—"}</td>
                  <td className="px-4 py-3">{m.email}</td>
                  <td className="px-4 py-3">{m.phone || "—"}</td>
                  <td className="px-4 py-3 max-w-xl">
                    <div className="line-clamp-3">{m.message}</div>
                  </td>
                  <td className="px-4 py-3">{m.consent ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

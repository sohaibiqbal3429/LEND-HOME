import { Schema, model, models, Types } from "mongoose";

export type LeadStatus = "NEW" | "QUALIFIED" | "DOCS" | "UNDERWRITING" | "OFFER" | "COMPLETED" | "LOST";

const LeadSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["NEW", "QUALIFIED", "DOCS", "UNDERWRITING", "OFFER", "COMPLETED", "LOST"], default: "NEW" },
    source: { type: String, default: "website" },
    notes: String,
    name: String,
    email: { type: String, required: true },
    phone: String,
    propertyPrice: { type: Number, required: true },
    deposit: { type: Number, required: true },
    incomeBand: String
  },
  { timestamps: true }
);

export const Lead = models.Lead || model("Lead", LeadSchema);


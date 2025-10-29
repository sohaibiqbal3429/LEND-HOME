import { Schema, model, models, Types } from "mongoose";

const ApplicationSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    leadId: { type: Types.ObjectId, ref: "Lead" },
    stage: { type: String, default: "DRAFT" },
    payload: Schema.Types.Mixed
  },
  { timestamps: true }
);

export const Application = models.Application || model("Application", ApplicationSchema);


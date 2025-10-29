import { Schema, model, models } from "mongoose";

const RateProductSchema = new Schema(
  {
    lender: { type: String, required: true },
    type: { type: String, required: true },
    termYears: { type: Number, required: true },
    rateAPR: { type: Number, required: true },
    fee: { type: Number, default: 0 },
    ltvMax: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const RateProduct = models.RateProduct || model("RateProduct", RateProductSchema);


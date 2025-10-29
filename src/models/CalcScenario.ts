import { Schema, model, models, Types } from "mongoose";

const CalcScenarioSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    inputs: Schema.Types.Mixed,
    outputs: Schema.Types.Mixed
  },
  { timestamps: true }
);

export const CalcScenario = models.CalcScenario || model("CalcScenario", CalcScenarioSchema);


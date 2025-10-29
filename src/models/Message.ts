import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true },
    phone: String,
    message: { type: String, required: true },
    consent: { type: Boolean, default: false },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", MessageSchema);


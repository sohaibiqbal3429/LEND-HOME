import { Schema, model, models } from "mongoose";

export type Role = "USER" | "ADMIN" | "ADVISOR";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true, index: true },
    phone: String,
    role: { type: String, enum: ["USER", "ADMIN", "ADVISOR"], default: "USER" }
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);


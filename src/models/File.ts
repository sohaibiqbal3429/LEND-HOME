import { Schema, model, models, Types } from "mongoose";

const FileSchema = new Schema(
  {
    appId: { type: Types.ObjectId, ref: "Application" },
    url: { type: String, required: true },
    mime: String,
    size: Number,
    checksum: String
  },
  { timestamps: true }
);

export const FileModel = models.FileModel || model("File", FileSchema);


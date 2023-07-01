import { Schema, model, models } from "mongoose";

const timestamp = new Schema(
  {
    initDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "timestamps",
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);

export default models?.Timestamp || model("Timestamp", timestamp);

import { Schema, model, models } from "mongoose";

const timestamp = new Schema(
  {
    validated: {
      type: Boolean,
      default: false,
    },
    initDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
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

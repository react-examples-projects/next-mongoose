import { Schema, model, models } from "mongoose";
const user = new Schema(
  {
    id: {
      type: String,
      required: [true, "Google id is required"],
    },
    name: {
      type: String,
      required: [true, "Google name is required"],
    },
    email: {
      type: String,
      required: [true, "Google email is required"],
    },
    profile_image: {
      type: String,
      required: [true, "Google profile image is required"],
    },
    provider: {
      type: String,
      required: [true, "Google provider is required"],
    },
    type: {
      type: String,
      required: [true, "Google type is required"],
    },
    providerAccountId: {
      type: String,
      required: [true, "Google provider account id is required"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);

export default models?.User || model("User", user);

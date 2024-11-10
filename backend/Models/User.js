import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // For Password Reset
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
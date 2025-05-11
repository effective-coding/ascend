import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    },
  }
);

const User = mongoose.model("users", UserSchema);

export default User;

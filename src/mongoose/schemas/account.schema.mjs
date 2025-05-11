import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    provider: {
      id: {
        type: mongoose.Schema.Types.String,
      },
      type: {
        type: mongoose.Schema.Types.String,
      },
    },
    credentials: {
      hash: {
        type: mongoose.Schema.Types.String,
      },
    },
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    },
  }
);

const Account = mongoose.model("accounts", AccountSchema);

export default Account;

import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    name: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: {
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    },
  }
);

const Room = mongoose.model("rooms", RoomSchema);

export default Room;

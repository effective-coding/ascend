import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    name: {
      id: {
        type: mongoose.Schema.Types.String,
      },
      type: {
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

const Room = mongoose.model("rooms", RoomSchema);

export default Room;

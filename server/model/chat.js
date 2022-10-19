import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    name: { type: String },
    groupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    currentMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

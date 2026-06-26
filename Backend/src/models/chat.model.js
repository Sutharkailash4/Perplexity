import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is Required"],
    },

    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({
  user: 1,
  updatedAt: -1,
});

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "Chat is Required"],
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: [true, "Role is Required"],
    },

    content: {
      type: String,
      required: [true, "Content is Required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({
  chat: 1,
  createdAt: 1,
});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
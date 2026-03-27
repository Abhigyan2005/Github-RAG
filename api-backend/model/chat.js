import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  repo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repo"
  },
  messages: [
    {
      role: String, 
      content: String
    }
  ]
}, { timestamps: true })

export const chat = mongoose.model("chat", chatSchema);


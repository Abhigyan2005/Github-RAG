import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  repoUrl: String,
  name: String,
});

repoSchema.index({ user: 1, repoUrl: 1 }, { unique: true });

export const repo = mongoose.model("repo", repoSchema);

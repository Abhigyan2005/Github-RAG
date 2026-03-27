import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: String,
  lastName: String,
  email: String,
  profile_pic: String,
});

export const user = mongoose.model("user", userSchema);


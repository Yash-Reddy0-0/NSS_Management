// Member.js

import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  position: { type: String, enum: ["head", "volunteer"], required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String }, // Store image URL
});

const Member = mongoose.model("Member", MemberSchema);
export default Member;

import mongoose from "mongoose";

const RoleAccessSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "member", "superAdmin"],
    required: true,
  },
  permissions: {
    type: [String], // array of allowed actions
    default: [],
  },
});

export default mongoose.model("RoleAccess", RoleAccessSchema);

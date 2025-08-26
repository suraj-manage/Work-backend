import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { 
    type: String, 
    enum: ["admin", "member", "superAdmin"], 
    default: "member" 
  },
});

export default mongoose.model("Roles", RolesSchema);
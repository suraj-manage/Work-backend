import mongoose from "mongoose";

const BoardSchema=new mongoose.Schema({
    title:{type:String,required:true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members:{type:Array,default:[]},
    color:{type:String,default:"#ffffff"},
    date: { type: Date, default: Date.now }
})

export default mongoose.model("Board", BoardSchema);
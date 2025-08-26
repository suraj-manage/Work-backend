import mongoose from "mongoose";

const ListSchema=new mongoose.Schema({
    title:{type:String,required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    board:{ type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    color:{type:String,default:"#ffffff"},
    date: { type: Date, default: Date.now },
    estimate:{type:Date,default:null},
    overdue:{type:Date,default:null},
})

export default mongoose.model("List", ListSchema); 
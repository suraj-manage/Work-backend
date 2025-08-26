import mongoose from "mongoose";

const CardSchema=new mongoose.Schema({
    title:{type:String,required:true},
    desp:{type:String,default:"",required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    board:{ type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    list:{ type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    color:{type:String,default:"#ffffff"},
    date: { type: Date, default: Date.now },
    estimate:{type:Date,default:null},
    overdue:{type:Boolean,default:false},
    checked:{type:Boolean,default:false},
})

export default mongoose.model("Card", CardSchema); 
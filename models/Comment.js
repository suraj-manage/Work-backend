import mongoose from "mongoose";

const CommentSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    board:{ type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    list:{ type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    card:{ type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
    text:{type:String,required:true},
    date: { type: Date, default: Date.now },
})

export default mongoose.model("Comment", CommentSchema); 
const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
    body:{type:Number,required:true},
  
 
},{
    timestamps:false,
    versionKey:false,
});
const Comment=mongoose.model("comment",commentSchema)

module.exports=Comment;
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    likes:{type:Number,required:true},
    coverImage:{type:String,required:true},
    conten:{type:String,required:true}
 
},{
    timestamps:false,
    versionKey:false,
});
const Book=mongoose.model("book",userSchema)

module.exports=Book
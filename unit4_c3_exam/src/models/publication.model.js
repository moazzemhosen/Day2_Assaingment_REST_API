const mongoose=require("mongoose");

const publicationSchema=new mongoose.Schema({
    name:{type:Number,required:true},
  
 
},{
    timestamps:false,
    versionKey:false,
});
const Publication=mongoose.model("publication",publicationSchema)

module.exports=Publication;
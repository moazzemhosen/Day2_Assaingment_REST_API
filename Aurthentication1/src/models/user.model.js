const mongoose=require("mongoose");
const bcrypt = require("bcrypt");//import bcrypt package


const userSchema= new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},
{
    timestamps:false,
    versionKey:false
});

userSchema.pre("save", function(next){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})
// for login its check password is exists or not
userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}



const User=mongoose.model("user",userSchema);
module.exports=User;
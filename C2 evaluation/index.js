const express=require("express");
// const mongoose=require("mongoose");

const app=express();

// const connect=()=>{
// return mongoose.connect("web15")
// }

app.listen(5000,(req,res)=>{
    // try {
    //     await connect()
    // } catch (error) {
    //     console.log(error)
    // }
    console.log("Listing at port 5000")
})
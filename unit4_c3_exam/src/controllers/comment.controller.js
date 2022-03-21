//const mongoose=require("mongoose");
const express=require("express");
const Comment=require("../models/comment.model");

const router=express.Router();

router.post("/",async(req,res)=>{
    try {
        const user=await Comment.create(req.body)
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
});


module.exports=router;
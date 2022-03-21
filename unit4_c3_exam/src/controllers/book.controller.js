const mongoose=require("mongoose");
const express=require("express");
const Book=require("../models/book.model");

const router=express.Router();

router.post("/",async(req,res)=>{
    try {
        const user=await Book.create(req.body)
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})


module.exports=router;
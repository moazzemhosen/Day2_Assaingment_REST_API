const mongoose=require("mongoose");
const express=require("express");
const { body, validationResult } = require('express-validator');
const User=require("../models/user.model");

const router=express.Router();

router.post("/",

body("firstName")
.not()
.isEmpty()
.withMessage("First name must be required")

.isLength({min:3,max:30}),

body("age")

.not()
.isEmpty()
.withMessage("age must be required")

.isLength({min:1,max:50}),

body("profileImages")

.not()
.isEmpty()
.withMessage("profile image must be required atleast one")

.isLength({min:1}),



async(req,res)=>{
    try {
        const user=await User.create(req.body)
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})


module.exports=router;
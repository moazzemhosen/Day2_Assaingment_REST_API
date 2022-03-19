

const express=require("express");
const { body, validationResult } = require('express-validator');
const User=require("../models/user.model");
const router=express.Router();

router.post("/",     body("firstName").not().isEmpty(),

body("lastName").not().isEmpty()
.withMessage("lastname is required"),

body("email").isEmail()
.withMessage("Email is required").
custom(async (value)=>{
const user =await User.findOne({email:value});

if(user){
    throw new Error("Email is already exists");
}

return true;
}),


body("pincode").not().isEmpty()
.withMessage("Pincode is required")
.isNumeric()
.isLength({ min: 6})
.withMessage("Pincode is atlist 6 character"), 

body("age").not().isEmpty()
.withMessage("age is required")
.isNumeric()
.custom((value)=>{
    if(value<1 ||value>100){
        throw new Error("age must be 1 t0 100");
    }
    return true;
}),

body("gender").not().isEmpty()
.withMessage("gender is required")
.custom((value)=>{
    if(value=="male" ||value=="female"){
        
        return true;
    }
    throw new Error("must be male or female");
}),   
 async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


        const user=await User.create(req.body);
        return res.status(201).send(user) 
    } catch (error) {
       return res.status(500).send({message:error.message});
    }
})



module.exports=router;
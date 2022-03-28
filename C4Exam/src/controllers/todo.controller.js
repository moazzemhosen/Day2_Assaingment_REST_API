const express=require("express")

const router =express.Router()

const Todo=require("../models/todo.model")

router.post("",async(req,res)=>{
  
    try {
        const todo= await Todo.create(req.body)
        return res.status(201).send(todo)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.get("",async(req,res)=>{
    try {
        const todo= await Todo.find()
        return res.status(201).send(todo)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

module.exports=router;




const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

require('dotenv').config()

const generateToken = (user) => {
    return jwt.sign({ user },process.env.secretkey)
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });//to check mail is exists or not

        if (user) {  //here we are checking
            return res.status(400).send({ message: "Email is already exists" });
        }
       
       
        user = await User.create(req.body);// if user not exists give him allow to register


        // send a token 
        const token = generateToken(user)
        return res.status(200).send({ user, token });



    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};












// do immediate this after register
const login = async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        //checked if mail exists
        if(!user){
            return res.status(400).send("Wrong Email or Password")
        }

        //if email exists, check password;
        const match = user.checkPassword(req.body.password)

        // if it doesn't match
        if(!match){
            return res.status(400).send({message : "Wrong Email or Password"})
        }

        // if it matches
        const token = generateToken(user)
        return res.status(200).send({user, token});


    } catch (error) {
        res.status(400).send({ message: err.message })
    }
};

module.exports = { register, login };
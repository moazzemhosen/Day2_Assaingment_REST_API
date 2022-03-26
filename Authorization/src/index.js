const express=require("express");
// const { body, validationResult } = require('express-validator');
const connect=require("./configs/db");
const userController=require("./controllers/user.controller");

// nd import register+login
const {register,login}=require("./controllers/auth.controller");
const productController=require("./controllers/product.controller");



const app= express();
app.use(express.json());



app.use("/users",userController);

//we dont want middleware 
//Thats why we dont use app.use

app.post("/register",register);
app.post("/login",login);

//last part
app.use("/products",productController)








//Port running part 
app.listen(5000,async ()=>{
    try {
        await connect();
        console.log("Listing at port 5000")
    } catch (error) {
        console.log(error)
    }
})
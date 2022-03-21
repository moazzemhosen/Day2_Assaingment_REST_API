const express=require("express");
const connect = require("./configs/db");

const app=express();

const userController=require("./controllers/user.controller");
const bookController=require("./controllers/user.controller");
const publicationController=require("./controllers/publication.controller")
const commentController=require("./controllers/comment.controller")

app.use(express.json());


app.use("/users",userController)
app.use("/books",bookController)
app.use("/publications",publicationController)
app.use("/comments",commentController)










app.listen(5000,async()=>{
    try {
        await connect();
        console.log("Listing at port 5000")
        
    } catch (error) {
        console.log(error)
    }
})
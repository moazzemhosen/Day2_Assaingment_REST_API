const express=require("express");

const app=express();

 app.use(logger)


app.get("/books",(req,res)=>{
    res.send({book1:"Charls",book2:"swaII",book3:"jonathon calls",book4:"Rich Dad Poor Dad"})
})
function logger(req,res,next){
    console.log("Fetching all books")
    next()
}

app.listen(5000,()=>{
console.log("listing port 5000")
})
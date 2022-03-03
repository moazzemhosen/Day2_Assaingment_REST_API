const  express= require ("express");
const app=express()
// console.log(app)


app.get("/home",function(req,res) {
    // console.log("Hello moazzem")
    res.send("hello")
})

app.get("/books",function(req,res) {
    res.send({book1:"Charls",book2:"swaII",book3:"jonathon calls",book4:"Rich Dad Poor Dad"})
})

app.listen(5000,()=>{
    console.log("listing port 5000")
})
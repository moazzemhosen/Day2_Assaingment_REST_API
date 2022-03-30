 ;
 const app=require("./index")
 const connect=require("./configs/db")


 app.listen(5000,async()=>{
     try {
         await connect();
         console.log("listing at port 5000")
     } catch (error) {
         console.log({message:error.message})
     }
 });
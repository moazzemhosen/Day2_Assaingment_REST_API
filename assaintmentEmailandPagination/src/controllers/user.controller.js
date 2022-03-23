const express=require("express");
const transporter=require("../configs/mail")

const User=require("../models/user.model");

const router = express.Router();



router.post("/",async (req,res)=>{
    try {
        const user=await User.create(req.body);
       // console.log(path.join(__dirname,"../htmlmail.html"));
        // send mail with defined transport object
   transporter.sendMail({
   from: '"Fred Foo 👻" <foo@example.com>', // sender address
   to: user.email, // list of receivers
   subject:`Welcome to ABC system ${user.first_name}${user.last_name}`, // Subject line
   text: ` Hi ${user.first_name}`, // plain text body
   html: `<b> Hi ${user.first_name}</b>` // html body
  
 });
return res.status(201).send({message:"your account is created"})
    } catch (error) {
       return res.status(500).send({message:error.message})
    }
});

router.get("/", async (req, res) => {
    try {
        //passing asa a qurey string
        const page=req.query.page || 1;
        const pagesize=req.query.pagesize||100; //   || for default pagesize 

//if page = 1 then data should be from 1 to 30
//if page = 2 then data should be from 31 to 60

const skip=(page - 1)*pagesize;//1 - 1 = 0 * Anithings=0;
//if page = 2 (2-1)=1 and 1*pagesize=30







        const user=await User.find().skip(skip).limit(pagesize).lean().exec();
        //for total pages
        const totalPages=Math.ceil((await User.find().countDocuments())/pagesize);

        return res.status(200).send({user,totalPages});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});


module.exports=router;
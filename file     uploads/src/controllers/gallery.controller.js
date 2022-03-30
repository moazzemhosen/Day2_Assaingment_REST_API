const express=require("express");
const path = require("path");


const upload = require("../middlewares/uploads")

const Gallery = require("../models/gallery.model");

const router=express.Router()

router.get("", async (req, res) => {
    try {
        const users = await Gallery.find().lean().exec();
        
  
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

 

  router.post("", upload.single("profilePic"), async (req, res) => {
    try {
      //   const user = await User.create(req.body)
      const user = await Gallery.create({
        first_name: req.body.first_name,
        profilePic: req.file.path,
      });
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  module.exports=router;
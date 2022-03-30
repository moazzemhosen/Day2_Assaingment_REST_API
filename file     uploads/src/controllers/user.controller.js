const express=require("express");
const path = require("path");


const upload = require("../middlewares/uploads")

const User = require("../models/user.model");

const router=express.Router()

router.get("", async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        
  
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).lean().exec();
        
  
      return res.status(200).send({user});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.post("", upload.single("profilePic"), async (req, res) => {
    try {
      //   const user = await User.create(req.body)
      const user = await User.create({
        first_name: req.body.first_name,
        profilePic: req.file.path,
      });
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  router.post("/multiple", upload.any("profilePic"), async (req, res) => {
    try {
      const filePaths = req.files.map((file) => {
        return file.path;
      });
  
      const user = await User.create({
        first_name: req.body.first_name,
        profilePic: filePaths,
      });
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  router.get("/multiple/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).lean().exec();
        
  
      return res.status(200).send({picture:user.profilePic});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  router.patch("/:id",upload.single("profilePic"), async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {  new: true })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(user.profilePic);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  // router.patch("/:id", upload.single("profilePic"), async (req, res) => {
  //   try {
  //     //   const user = await User.create(req.body)
  //     const user = await User.create({
  //       first_name: req.body.first_name,
  //       profilePic: req.file.path,
  //     });
  //     return res.status(200).send(user);
  //   } catch (err) {
  //     return res.status(500).send({ message: err.message });
  //   }
  // });

  router.delete("/:id",  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  
  });


module.exports=router;

const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const Product = require("../models/product.model")

router.post("", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const product = await Product.create(req.body)
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.get("", async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
});

router.patch("/:id", async (req, res) => {
    try {
      const user = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const item = await Product.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(item);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });



module.exports = router;
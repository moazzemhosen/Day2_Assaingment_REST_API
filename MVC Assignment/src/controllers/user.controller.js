const express = require("express")

const User = require("../models/user.model")

const router = express.Router();



// ===================USERS CRUD==============

router.post("", async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).send(user)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
router.get("", async (req, res) => {
    try {
        const users = await User.find().lean().exec() //db.users.find()
        return res.send(users)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();

        if (user) {
            return res.send(user);
        } else {
            return res.status(404).send({ message: "User not found" })
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});


router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        res.status(201).send(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();

        res.send(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
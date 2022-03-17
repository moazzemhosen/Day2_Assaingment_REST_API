const express = require("express")

const Student = require("../models/student.model")

const router = express.Router();



// ===================USERS CRUD==============

router.post("", async (req, res) => {
    try {
        const student = await Student.create(req.body)
        return res.status(201).send(student)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
router.get("", async (req, res) => {
    try {
        const students = await Student.find().lean().exec() //db.users.find()
        return res.send(students)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).lean().exec();

        if (student) {
            return res.send(student);
        } else {
            return res.status(404).send({ message: "User not found" })
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});


router.patch("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        res.status(201).send(student);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec();

        res.send(student);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
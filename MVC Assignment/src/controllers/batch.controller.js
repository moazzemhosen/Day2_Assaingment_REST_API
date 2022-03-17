const express = require("express")

const Batch = require("../models/batch.model")

const router = express.Router();



router.post("", async (req, res) => {
    try {
        const batch = await Batch.create(req.body)
        return res.status(201).send(batch)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
router.get("", async (req, res) => {
    try {
        const batches = await Batch.find().lean().exec() 
        return res.send(batches)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id).lean().exec();

        if (batch) {
            return res.send(batch);
        } else {
            return res.status(404).send({ message: "Batch not found" })
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        res.status(201).send(batch);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const batch = await Batch.findByIdAndDelete(req.params.id).lean().exec();

        res.send(batch);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
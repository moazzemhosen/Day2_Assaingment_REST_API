const express = require("express")

const Evaluation = require("../models/evaluation.model")

const router = express.Router();



router.post("", async (req, res) => {
    try {
        const evaluation = await Evaluation.create(req.body)
        return res.status(201).send(evaluation)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
router.get("", async (req, res) => {
    try {
        const evaluations = await Evaluation.find().populate({ path: "instructor_id", select: ["firstName", "lastName"] }).populate({ path: "batch_id", select: "batchName" }).lean().exec();
        return res.send(evaluations);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).lean().exec();

        if (evaluation) {
            return res.send(evaluation);
        } else {
            return res.status(404).send({ message: "Batch not found" })
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        res.status(201).send(evaluation);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndDelete(req.params.id).lean().exec();

        res.send(evaluation);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
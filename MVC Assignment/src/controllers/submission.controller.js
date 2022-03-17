const express = require("express")

const Submission = require("../models/submission.model")

const router = express.Router();



router.post("", async (req, res) => {
    try {
        const submission = await Submission.create(req.body)
        return res.status(201).send(submission)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
router.get("", async (req, res) => {
    try {
        const submissions = await Submission.find().lean().exec();
        return res.send(submissions);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id).lean().exec();

        if (submission) {
            return res.send(submission);
        } else {
            return res.status(404).send({ message: "Batch not found" })
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        res.status(201).send(submission);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id).lean().exec();

        res.send(submission);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
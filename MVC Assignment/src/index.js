const express = require("express");
const connect = require("./configs/db")


const userController = require("./controllers/user.controller");
const studentController = require("./controllers/student.controller");
const batchController = require("./controllers/batch.controller");
const evaluationController = require("./controllers/evaluation.controller");
const submissionController = require("./controllers/submission.controller");

const app = express();

app.use(express.json())

app.use("/users", userController);
app.use("/students", studentController);
app.use("/batches", batchController);
app.use("/evaluations", evaluationController);
app.use("/submissions", submissionController);

app.listen(5000, async function () {
    try {
        await connect();
        console.log("Listening on port 5000");
    } catch (e) {
        console.log(e.message)
    }
})
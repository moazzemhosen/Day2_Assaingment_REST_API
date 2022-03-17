const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://moazzem:moazzem_123@cluster0.fapda.mongodb.net/web15?retryWrites=true&w=majority");
};
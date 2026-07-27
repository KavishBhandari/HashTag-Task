const mongoose = require("mongoose");
const ApiError = require("../../utils/apiError");


const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL || "mongodb://localhost:27017/mongodbLearning");
    } catch (error) {
        console.error(error)
        throw new ApiError(500, "Database connection error.")
    }
};

module.exports = connectDatabase;
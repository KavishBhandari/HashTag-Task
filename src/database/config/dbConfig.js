const mongoose = require("mongoose");
const ApiError = require("../../utils/apiError");


const connectDatabase = async () => {
    try {
        console.log("connectDatabase funtioon is called::::::::")
        await mongoose.connect(process.env.DB_CONNECTION_URL || "mongodb://localhost:27017/mongodbLearning");
        console.log("database conneted successfully....")
    } catch (error) {
        console.error("🔴 Database connection error:", error);
        throw new ApiError(500, "Database connection error.")
    }
};

module.exports = connectDatabase;
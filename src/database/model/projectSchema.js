const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
   status: {
       type: String,
       enum: ["Active", "Completed"],
       default: "Active"
   }
}, {
    timestamps: { createdAt: true, updatedAt: true}
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
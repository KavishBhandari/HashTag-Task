const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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

projectSchema.plugin(mongoosePaginate);
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Todo", "InProgress", "Done"],
      default: "Todo",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
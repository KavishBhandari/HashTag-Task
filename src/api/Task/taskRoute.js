const taskRoute = require("express").Router();

const taskController = require("./taskController");

const taskValidator = require("./taskvalidator");

taskRoute.post("/tasks", taskValidator.createTaskValidation, taskController.createTask);

taskRoute.put("/tasks/:id", taskValidator.updateTaskValidation, taskController.updateTask);

taskRoute.delete("/tasks/:id", taskController.deleteTask);

taskRoute.get("/tasks", taskController.getTask);

module.exports = taskRoute;
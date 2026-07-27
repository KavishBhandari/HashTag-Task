const projectRoute = require("express").Router();

const projectController = require("./projectController");

const projectValidator = require("./projectValidator");

projectRoute.post("/projects", projectValidator.createProjectValidation, projectController.createProject);

projectRoute.get("/projects/:id", projectController.getProject);

projectRoute.get("/projects", projectController.getAllProject);

module.exports = projectRoute;
const indexRoute = require("express").Router();

const projectRoute = require("./Project/projectRoute");
const taskRoute = require("./Task/taskRoute");

indexRoute.use("/", projectRoute);
indexRoute.use("/", taskRoute);

module.exports = indexRoute;
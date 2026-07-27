const responseHelper = require("../../helper/responseHelper");
const taskHelper = require("./taskHelper");
class TaskController {
    createTask = async (req, res) => {
        try {
            await taskHelper.checkProjectAlreadyExist(req.body.projectId);
            await taskHelper.checkTaskAlreadyExist(req.body.title, req.body.projectId);
            const task = await taskHelper.createTask(req.body);
            responseHelper.sendSuccessResponse(
                res,
                200,
                "Task created successfully",
                task,
            );
        } catch(error) {
            responseHelper.sendErrorResponse(
                res,
                error.statusCode ? error.statusCode : 500,
                error.message ? error.message : "Internal Server Error",
                {},
            );
        }
    };

    getTask = async (req, res) => {
        try {
            const task = await taskHelper.getTask(req.query);
            responseHelper.sendSuccessResponse(
                res,
                200,
                "Task fetched successfully",
                task,
            );
        } catch(error) {
            responseHelper.sendErrorResponse(
                res,
                error.statusCode ? error.statusCode : 500,
                error.message ? error.message : "Internal Server Error",
                {},
            );
        }
    };

    updateTask = async (req, res) => {
        try {
            await taskHelper.updateTask(req.params.id, req.body);
             responseHelper.sendSuccessResponse(
                res,
                200,
                "Task updated successfully",
                task,
            );
        } catch(error) {
            responseHelper.sendErrorResponse(
                res,
                error.statusCode ? error.statusCode : 500,
                error.message ? error.message : "Internal Server Error",
                {},
            );
        }
    };

    deleteTask = async (req, res) => {
        try {
            await taskHelper.deleteTask(req.params.id);
             responseHelper.sendSuccessResponse(
                res,
                200,
                "Task deleted successfully",
                task,
            );
        } catch(error) {
            responseHelper.sendErrorResponse(
                res,
                error.statusCode ? error.statusCode : 500,
                error.message ? error.message : "Internal Server Error",
                {},
            );
        }
    };


};

module.exports = new TaskController();
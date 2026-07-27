const responseHelper = require("../../helper/responseHelper");
const projectHelper = require("./projectHelper");

class ProjectController {
    createProject = async (req, res) => {
        try {
            await projectHelper.checkProjectAlreadyExist(req.body.name);
            const project = await projectHelper.createProject(req.body);
            responseHelper.sendSuccessResponse(
                res,
                200,
                "Project created successfully",
                project,
            );
        } catch (error) {
            responseHelper.sendErrorResponse(
                res,
                error.statusCode ? error.statusCode : 500,
                error.message ? error.message : "Internal Server Error",
                {},
            );
        }
    };

    getProject = async (req, res) => {
        try{
           const project = await projectHelper.getProject(req.params.id);
           responseHelper.sendSuccessResponse(
                res,
                200,
                "Project fetched successfully",
                project,
            );
        }
        catch (error) {
            responseHelper.sendErrorResponse(
                res,
                error.statusCode ? error.statusCode : 500,
                error.message ? error.message : "Internal Server Error",
                {},
            );
        }
    };

    getAllProject = async (req, res) => {
        try{
            const allProject = await projectHelper.getAllProject(req.query);
            responseHelper.sendSuccessResponse(
                res,
                200,
                "All Project fetched successfully",
                allProject,
            );
        }
        catch (error) {
            responseHelper.sendErrorResponse(
                res,
                error.statusCode ? error.statusCode : 500,
                error.message ? error.message : "Internal Server Error",
                {},
            );
        }
    };


};

module.exports = new ProjectController();
const Project = require("../../database/model/projectSchema");
const dbHelper = require("../../helper/dbHelper");
const ApiError = require("../../utils/apiError");
const mongoose = require("mongoose");

class ProjectHelper {

    checkProjectAlreadyExist = async (name) => {
        const project = await dbHelper.getData(
            Project,
            { name: name },
            false,
            ["name"]
        );
        if (project) {
            throw new ApiError(400, "Project already exist.");
        }
        return;
    };

    createProject = async (body) => {
        return await dbHelper.createData(
            Project,
            body,
            false
        );
    };

    getProject = async (id) => {
        const projectId = new mongoose.Types.ObjectId(id);
        const project = await dbHelper.getData(
            Project,
            { _id: projectId },
            false,
            ["name", "description", "status"]
        );
        if(!project) {
            throw new ApiError(404, "Project not found.");
        }
        return project;
    };

    getAllProject = async (query) => {
        return await dbHelper.getData(
            Project,
            {},
            true,
            ["name", "description", "status"],
            [],
            query.page,
            query.limit
        );
    };
};

module.exports = new ProjectHelper();
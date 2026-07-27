const dbHelper = require("../../helper/dbHelper");
const Task = require("../../database/model/task");
const Project = require("../../database/model/projectSchema");
const mongoose = require("mongoose");
class TaskHelper {
    createTask = async (body) => {
        return await dbHelper.createData(Task, body, false);
    };

    checkProjectAlreadyExist = async (projectId) => {
        const project_id = new mongoose.Types.ObjectId(projectId);
        if (!(await dbHelper.getData(Project, { _id: project_id }, false, ["name"]))) {
            throw new ApiError(400, "Project does not exist.");
        }
        return;
    }

    getAllUsers1 = async (query) => {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        const pipeline = [
            {
                $lookup: {
                    from: "useraddresses",
                    localField: "_id",
                    foreignField: "userId",
                    as: "UserAddress"
                }
            },
            {
                $lookup: {
                    from: "userprofiles",
                    localField: "_id",
                    foreignField: "userId",
                    as: "UserProfile"
                }
            },
        ];

        if (query.search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: query.search, $options: "i" } },
                        { email: { $regex: query.search, $options: "i" } },
                        { "UserAddress.city": { $regex: query.search, $options: "i" } }
                    ]
                }
            });
        }

        if (query.sortBy) {
            const sortOrder = query.sortOrder === "desc" ? -1 : 1;
            pipeline.push({
                $sort: { [query.sortBy]: sortOrder }
            });
        }

        pipeline.push({
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                totalCount: [{ $count: "count" }]
            }
        });

        const result = await userModel.aggregate(pipeline);
        console.log(" result ::::::::::::", result);
        const users = result[0].data;
        const total = result[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(total / limit);

        return {
            users,
            pagination: {
                TotalRecords: total,
                TotalPages: totalPages,
                CurrentPage: page,
                NextPage: page < totalPages ? page + 1 : null
            }
        };
        //return result;

    };

    getTask = async (query) => {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        const pipeline = [
            {
                $lookup: {
                    from: "projects",
                    localField: "projectId",
                    foreignField: "_id",
                    as: "UserAddress"
                }
            }
        ];

        if (query.search) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: query.search, $options: "i" } },
                        { description: { $regex: query.search, $options: "i" } },
                        { assignedTo: { $regex: query.search, $options: "i" } },
                        { status: { $regex: query.search, $options: "i" } }
                    ]
                }
            });
        }

        if (query.sortBy) {
            const sortOrder = query.sortOrder === "desc" ? -1 : 1;
            pipeline.push({
                $sort: { [query.sortBy]: sortOrder }
            });
        }

        pipeline.push({
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                totalCount: [{ $count: "count" }]
            }
        });

        const result = await Task.aggregate(pipeline);
        const tasks = result[0].data;
        const total = result[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(total / limit);

        return {
            tasks,
            pagination: {
                TotalRecords: total,
                TotalPages: totalPages,
                CurrentPage: page,
                NextPage: page < totalPages ? page + 1 : null
            }
        };
    }

    checkTaskAlreadyExist = async (title, projectId) => {
        const project_id = new mongoose.Types.ObjectId(projectId);
        if ((await dbHelper.getData(Task, { title: title, projectId: project_id }, false, ["title"]))) {
            throw new ApiError(400, "Task already exist.");
        }
        return;
    }

    isTaskExist = async (task_id) => {
        const task = await dbHelper.getData(
            Task,
            { _id: task_id },
            false,
            ["title", "_id"]
        );
        if (!task) {
            throw new ApiError(400, "Task does not exist.");
        }
        return;
    }

    updateTask = async (taskId, body) => {
        const task_id = new mongoose.Types.ObjectId(taskId);
        await this.isTaskExist(task_id);
        return await dbHelper.updateData(Task, { _id: task_id }, body);
    }

    deleteTask = async (taskId) => {
        const task_id = new mongoose.Types.ObjectId(taskId);
        await this.isTaskExist(task_id);
        return await dbHelper.deleteData(Task, { _id: task_id });
    }
};

module.exports = new TaskHelper();
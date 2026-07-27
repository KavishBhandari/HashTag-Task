const joi = require("joi");

class TaskValidation {
    createTaskValidation = async (req, res, next) => {
        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
            assignedTo: joi.string().required(),
            priority: joi.string().valid("Low", "Medium", "High").default("Low"),
            status: joi.string().valid("Todo", "InProgress", "Done").default("Todo"),
            projectId: joi.string().required()
        });
        await schema.validateAsync(req.body);
        next();
    };

    updateTaskValidation = async (req, res, next) => {
        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
            assignedTo: joi.string().required(),
            priority: joi.string().valid("Low", "Medium", "High").default("Low"),
            status: joi.string().valid("Todo", "InProgress", "Done").default("Todo"),
        });
        await schema.validateAsync(req.body);
        next();
    };

};

module.exports = new TaskValidation();
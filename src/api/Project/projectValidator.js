const joi = require("joi");

class ProjectValidation {
    createProjectValidation = async (req, res, next) => {
        const schema = joi.object({
            name: joi.string().required(),
            description: joi.string().required(),
            status: joi.string().valid("Active", "Completed").default("Active")
        });
        await schema.validateAsync(req.body);
        next();
    };

};

module.exports = new ProjectValidation();
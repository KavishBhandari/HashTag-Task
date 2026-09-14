const ApiError = require("../utils/apiError");

class DbHelper {
    createData = async (model, data, bulkCreate) => {
        try {
            const responseData = bulkCreate
                ? await model.insertMany(data)
                : await model.create(data);

            return responseData;
        } catch (error) {
            throw new ApiError(500, error?.message ? error?.message : "INTERNAL SERVER ERROR");
        }

    };

    getData = async (model, condition, findAll, attributes, populateFields = [], page = 1, limit = 10) => {
        try {
            if (findAll) {
                const options = {
                    page: parseInt(page) || 1,
                    limit: parseInt(limit) || 10,
                    select: attributes,
                    populate: populateFields
                };

                const result = await model.paginate(condition, options);

                return {
                    docs: result.docs,
                    pagination: {
                        totalDocs: result.totalDocs,
                        totalPages: result.totalPages,
                        currentPage: result.page,
                        nextPage: result.hasNextPage ? result.nextPage : null,
                        prevPage: result.hasPrevPage ? result.prevPage : null,
                        pageSize: result.limit
                    }
                };
            } else {
                return await model.findOne(condition).select(attributes).populate(populateFields);
            }
        } catch (error) {
            throw new ApiError(500, error?.message ? error?.message : "INTERNAL SERVER ERROR");
        }

    };


    updateData = async (model, condition, data) => {
        try {
            return await model.findOneAndUpdate(
                condition,
                data,
                { new: true }
            );
        } catch (error) {
            throw new ApiError(500, error?.message ? error?.message : "INTERNAL SERVER ERROR");
        }

    };

    deleteData = async (model, condition) => {
        try {
            return await model.findOneAndDelete(condition);
        } catch (error) {
            throw new ApiError(500, error?.message ? error?.message : "INTERNAL SERVER ERROR");
        }

    };
};

module.exports = new DbHelper();

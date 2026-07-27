class ResponseHelper {
    sendSuccessResponse = (res, statusCode, message, data={}) => {
        return res.status(statusCode).send({
            success : true,
            message : message,
            data
        });
    };

    sendErrorResponse = (res, statusCode, message, data={}) => {
        return res.status(statusCode).send({
            success : false,
            message : message,
            data
        })
    };
};

module.exports = new ResponseHelper();
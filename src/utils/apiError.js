class ApiError {
    statusCode; message;
    constructor(statusCode, message){
        this.statusCode = statusCode,
        this.message = message
    };
};

module.exports = ApiError;
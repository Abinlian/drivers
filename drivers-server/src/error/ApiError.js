const ApiErrorTypes = require('./ApiErrorTypes');

/**
 * 自定义Api异常
 */
class ApiError extends Error {
    //构造方法
    constructor(error_type) {
        super();

        let error_info = ApiErrorTypes.getErrorInfo(error_type);

        this.code = error_info.code;
        this.message = error_info.message;
    }
}

module.exports = ApiError;
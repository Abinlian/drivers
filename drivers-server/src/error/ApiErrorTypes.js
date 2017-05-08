/**
 * API错误名称
 */
let ApiErrorTypes = {};

ApiErrorTypes.NO_SESSION = "NO_SESSION";
ApiErrorTypes.NO_PERMISSION = "NO_PERMISSION";

ApiErrorTypes.INVALID_ARGUMENT = "INVALID_ARGUMENT";

ApiErrorTypes.USERNAME_NOT_EXISTS = "USERNAME_NOT_EXISTS";
ApiErrorTypes.INCORRECT_PASSWORD = "INCORRECT_PASSWORD";

ApiErrorTypes.USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS";

ApiErrorTypes.USER_NOT_EXIST = "USER_NOT_EXIST";

ApiErrorTypes.UNKNOW_ERROR = "UNKNOW_ERROR";

/**
 * API错误名称对应的错误信息
 */

//根据错误名称获取错误信息
ApiErrorTypes.getErrorInfo = (error_type) => {

    let error_info;

    switch (error_type) {

        case ApiErrorTypes.NO_SESSION:
            error_info = { code: 100, message: '未登录' };
            break;

        case ApiErrorTypes.NO_PERMISSION:
            error_info = { code: 105, message: '没有操作权限' };
            break;

        case ApiErrorTypes.INVALID_ARGUMENT:
            error_info = { code: 101, message: '参数不合法' };
            break;

        case ApiErrorTypes.USERNAME_NOT_EXISTS:
            error_info = { code: 112, message: '用户名不存在' };
            break;

        case ApiErrorTypes.INCORRECT_PASSWORD:
            error_info = { code: 113, message: '密码错误' };
            break;

        case ApiErrorTypes.USERNAME_ALREADY_EXISTS:
            error_info = { code: 106, message: '用户名已存在' };
            break;

        case ApiErrorTypes.USER_NOT_EXIST:
            error_info = { code: 102, message: '用户不存在' };
            break;






        case ApiErrorTypes.UNKNOW_ERROR:
            error_info = { code: -1, message: '未知错误' };
            break;
            
        default:
            error_info = { code: -1, message: '未知错误' };

    }

    return error_info;
}

module.exports = ApiErrorTypes;
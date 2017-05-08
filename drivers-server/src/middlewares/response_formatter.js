var ApiError = require('../error/ApiError');

/**
 * 在app.use(router)之前调用
 */
var success_formatter = (ctx) => {
    //如果有返回数据，将返回数据添加到data中
    ctx.body = {
        status: 0,
        message: 'success',
        time: new Date(),
        data: ctx.body
    }
}

var error_formatter = (ctx, code, message) => {
    ctx.body = {
        status: code,
        message,
        time: new Date(),
        data: null
    }
}

var response_formatter = (pattern) => {
    return async (ctx, next) => {
        var reg = new RegExp(pattern);

        if (reg.test(ctx.originalUrl)) {
            try {
                //先去执行路由
                await next();
                //无异常
                success_formatter(ctx);
            } catch (error) {
                //有异常，如果异常类型是API异常，从这个异常中恢复。将错误信息添加到响应体中返回。
                if (error instanceof ApiError) {
                    error_formatter(ctx, error.code, error.message);
                }
                //如果不是API异常，继续抛，让外层中间件处理日志
                else {
                    throw error;
                }
            }
        }
        else {
            await next();
        }
    }
}

module.exports = response_formatter;

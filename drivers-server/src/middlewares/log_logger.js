const logUtil = require('../utils/log');

module.exports = function () {

  return async (ctx, next) => {
    const start = new Date();
    try {
      //先去执行路由
      await next();
      const ms = new Date() - start;
      //记录响应日志
      logUtil.logResponse(ctx, ms);
    } catch (err) {
      const ms = new Date() - start;
      //记录异常日志
      logUtil.logError(ctx, err, ms);

      console.log(err);
      
      //继续抛，emit error
      // throw err;

    }

    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  }
  
}
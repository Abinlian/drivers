const ApiError = require('../error/ApiError');
const ApiErrorTypes = require('../error/ApiErrorTypes');

module.exports = function () {

  return async (ctx, next) => {

    if (!ctx.session.user) {
      throw new ApiError(ApiErrorTypes.NO_SESSION);
    }
    else {
      await next();
    }

  }
  
}
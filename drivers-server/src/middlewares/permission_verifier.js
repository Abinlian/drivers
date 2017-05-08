const ApiError = require('../error/ApiError');
const ApiErrorTypes = require('../error/ApiErrorTypes');

module.exports = function () {

  return async (ctx, next) => {

    let user_id = ctx.params.user_id;

    if (user_id != ctx.session.user.id) {
      throw new ApiError(ApiErrorTypes.NO_PERMISSION);
    }
    else {
      await next();
    }

  }
  
}
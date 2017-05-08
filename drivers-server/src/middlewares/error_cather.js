const ApiError = require('../error/ApiError');
const ApiErrorTypes = require('../error/ApiErrorTypes');

module.exports = function () {

  return async (ctx, next) => {

    try {
      
      await next();

    } catch (err) {

      if (err instanceof ApiError) {
          throw err;
      }
      else {
        if (process.env.NODE_ENV == 'development') throw err;
        else throw new ApiError(ApiErrorTypes.UNKNOW_ERROR);
      }

    }

  }
  
}
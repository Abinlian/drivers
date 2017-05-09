const ApiError = require('../../error/ApiError');
const ApiErrorTypes = require('../../error/ApiErrorTypes');
const user = require('../models/user.model');

const {
  isIntString,
  isFloatString,
  isBooleanString,
  isNotEmptyString
} = require('../../utils/validator');

exports.retrieveOne = async (ctx, next) => {

    let user_id = ctx.params.user_id;

    if (!isIntString(user_id)) {
        throw new ApiError(ApiErrorTypes.INVALID_ARGUMENT);
    }

    let record = await user.findOneById(user_id);

    if (record.length == 0) {
        throw new ApiError(ApiErrorTypes.USER_NOT_EXIST);
    }

    ctx.body = record[0];

};

exports.create = async (ctx, next) => {

    let username = ctx.request.body.username;
    let password_hash = ctx.request.body.password_hash;

    if (!isNotEmptyString(username) || !isNotEmptyString(password_hash)) {
        throw new ApiError(ApiErrorTypes.INVALID_ARGUMENT);
    }

    let countRecord;
    countRecord = await user.findCountByUsername(username);
    if (countRecord[0].count != 0) {
        throw new ApiError(ApiErrorTypes.USERNAME_ALREADY_EXISTS);
    }

    let record = await user.create(username, password_hash);

    ctx.body = { insert_id: record.insertId };

};

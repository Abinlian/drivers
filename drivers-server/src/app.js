const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-session');

const log_logger = require('./middlewares/log_logger')
const response_formatter = require('./middlewares/response_formatter');
const error_cather = require('./middlewares/error_cather');
const session_verifier = require('./middlewares/session_verifier');
const validator = require('./utils/validator');
const ApiError = require('./error/ApiError');
const ApiErrorTypes = require('./error/ApiErrorTypes');
const config = require('./config/config')

const index = require('./routes/index.router');

const user = require('./api/routes/user.router');

const userModel = require('./models/user.model');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(process.cwd() + '/public'));
app.use(views(__dirname + '/views', { extension: 'jade' }));

app.keys = [config.sessionKey];
app.use(session(getSessionOptions(), app));

// 日志中间件
app.use(log_logger());
// 格式化处理响应结果中间件，在添加路由之前调用
app.use(response_formatter('^/api'));
// 错误处理中间件，在添加路由之前调用
app.use(error_cather());

setLoginRouter(router);
setLogoutRouter(router);

router.use('/', index.routes(), index.allowedMethods());

router.use('/api/users', user.routes(), user.allowedMethods());

// router.redirect('/*', '/pages/movies');

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err);
});


module.exports = app;

function getSessionOptions() {
  return {
    // key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    // maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
    // overwrite: true, /** (boolean) can overwrite or not (default true) */
    // httpOnly: true, /** (boolean) httpOnly or not (default true) */
    // signed: true, /** (boolean) signed or not (default true) */
  };
}

function setLoginRouter(router) {

  router.post('/api/login', async (ctx, next) => {

    let username = ctx.request.body.username;
    let password_hash = ctx.request.body.password_hash;

    if (!validator.isNotEmptyString(username) || !validator.isNotEmptyString(password_hash)) {
        throw new ApiError(ApiErrorTypes.INVALID_ARGUMENT);
    }

    let record = await userModel.findOneByUsername(username);
    if (record.length == 0) {
        throw new ApiError(ApiErrorTypes.USERNAME_NOT_EXISTS);
    }
    if (record[0].password_hash != password_hash) {
        throw new ApiError(ApiErrorTypes.INCORRECT_PASSWORD);
    }

    let user = { id: record[0].id };
    Object.assign(ctx.session, { user });

  });

}

function setLogoutRouter(router) {
  router.post('/api/logout', session_verifier(), async (ctx, next) => {
    delete ctx.session.user;
  });
}

// an option to check centralizedly
//
// function setSessionCheck(router) {

//   const whiteList = [
//     '/',
//     '/api/login'
//   ];
//   router.use('/*', async (ctx, next) => {

//     if (!isInWhiteList(ctx.path) && !ctx.session.user) {
//       throw new ApiError(ApiErrorTypes.NO_SESSION);
//     } else {
//       await next();
//     }

//   }, router.allowedMethods());

//   function isInWhiteList(path) {
//     return whiteList.some(onePath => path == onePath);
//   }

// }


/**
 * @api {post} /api/login login
 * @apiGroup session
 * @apiVersion 0.0.1
 *
 * @apiParam {String} username
 * @apiParam {String} password_hash
 *
 * @apiParamExample RequestExample
 *   /api/login
 *
 * @apiSuccessExample {json} OK
    {
        "status": ,
        "message": "success",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 * 
 * @apiErrorExample {json} UNKNOW_ERROR
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 * @apiErrorExample {json} INVALID_ARGUMENT
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 * @apiErrorExample {json} USERNAME_NOT_EXISTS
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 * @apiErrorExample {json} INCORRECT_PASSWORD
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 */


/**
 * @api {post} /api/logout logout
 * @apiGroup session
 * @apiVersion 0.0.1
 *
 * @apiParamExample RequestExample
 *   /api/logout
 *
 * @apiSuccessExample {json} OK
    {
        "status": ,
        "message": "success",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 * 
 * @apiErrorExample {json} UNKNOW_ERROR
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 * @apiErrorExample {json} NO_SESSION
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 */

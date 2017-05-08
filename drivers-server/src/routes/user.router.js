const router = require('koa-router')();

const session_verifier = require('../middlewares/session_verifier');
const permission_verifier = require('../middlewares/permission_verifier');

const userCtrl = require('../controllers/user.ctrl');

/**
 * @api {get} /api/users/:id 获取用户详细信息
 * @apiName 获取用户详细信息
 * @apiGroup user
 * @apiVersion 0.0.1
 *
 * @apiParamExample RequestExample
 *   /api/users/20
 *
 * @apiSuccessExample {json} OK
    {
        "status": ,
        "message": "success",
        "time": "2017-02-20T12:09:26.412Z",
        "data":
            {

            }
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
 * @apiErrorExample {json} NO_PERMISSION
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
 * @apiErrorExample {json} USER_NOT_EXIST
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 */
router.get('/:user_id', session_verifier(), permission_verifier(), userCtrl.retrieveOne);

/**
 * @api {post} /api/users 注册用户
 * @apiName 注册用户
 * @apiGroup user
 * @apiVersion 0.0.1
 *
 * @apiParamExample RequestExample
 *   /api/users

 * @apiParam {String} username
 * @apiParam {String} password_hash
 *
 * @apiSuccessExample {json} OK
    {
        "status": ,
        "message": "success",
        "time": "2017-02-20T12:09:26.412Z",
        "data": {
            insert_id: 999
        }
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
 * @apiErrorExample {json} USERNAME_ALREADY_EXISTS
    {
        "status": ,
        "message": "XX错误",
        "time": "2017-02-20T12:09:26.412Z",
        "data": null
    }
 */
router.post('/', userCtrl.create);

module.exports = router;

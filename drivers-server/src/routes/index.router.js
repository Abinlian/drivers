const router = require('koa-router')();

const sessionRouter = require('./session.router');
const movieRouter = require('./movie.router');

router.use('', sessionRouter.routes(), sessionRouter.allowedMethods());
router.use('movies', movieRouter.routes(), movieRouter.allowedMethods())

module.exports = router;

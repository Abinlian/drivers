const router = require('koa-router')();

router.get('login', async function (ctx, next) {
    
  ctx.state = {
    title: '登录'
  };

  await ctx.render('login');
  
});

router.get('register', async function (ctx, next) {
    
  ctx.state = {
    title: '注册'
  };

  await ctx.render('register');
  
});

module.exports = router;

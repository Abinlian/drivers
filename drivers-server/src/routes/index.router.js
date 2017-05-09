var router = require('koa-router')();

router.get('/movies', async function (ctx, next) {
    
  console.log(123);

  ctx.state = {
    title: 'Drivers 电影'
  };

  await ctx.render('index', {
    page_name: '电影选择页面'
  });

});

router.get('/movies/:movie_id', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影'
  };

  await ctx.render('index', {
    page_name: '电影详情页面'
  });
  
});

router.get('/movies/:movie_id/cinemas', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影'
  };

  await ctx.render('index', {
    page_name: '电影院选择页面'
  });
  选座页面
});

router.get('/movies/:movie_id/cinemas/:cinema_id/rooms/:room_id', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影'
  };

  await ctx.render('index', {
    page_name: '座位选择页面'
  });
  
});

module.exports = router;

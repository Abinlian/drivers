const router = require('koa-router')();

router.get('/', async function (ctx, next) {
  
  // database query
  // ctx.state = database query
  ctx.state = {
      movies: [
          {
            id: 1,
            status: 'xc',
            name: 'name1',
            img_url: 'http://p0.meituan.net/movie/aeb864fa21d578d845b9cefc056e40cb2874891.jpg@160w_220h_1e_1c',
            rating: 8.1
          },
          {
            id: 2,
            status: 'xc',
            name: 'name2',
            img_url: 'http://p0.meituan.net/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg@160w_220h_1e_1c',
            rating: 8.9
          }
      ]
  };

  await ctx.render('movie-list');

});

router.get('/:movie_id', async function (ctx, next) {

  await ctx.render('movie-detail', {
    page_name: '电影详情页面'
  });
  
});

router.get('/:movie_id/cinemas', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影'
  };

  await ctx.render('index', {
    page_name: '电影院选择页面'
  });
  选座页面
});

router.get('/:movie_id/cinemas/:cinema_id/rooms/:room_id', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影'
  };

  await ctx.render('index', {
    page_name: '座位选择页面'
  });
  
});

module.exports = router;

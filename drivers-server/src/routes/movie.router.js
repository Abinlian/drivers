const router = require('koa-router')();

const movieModel = require('../models/movie.model');

router.get('/', async function (ctx, next) {
  
  let movies = await movieModel.findAllMovies();
  // console.log(movies);

  ctx.state = {
      movies
  };

  await ctx.render('movie-list');

});

router.get('/:movie_id', async function (ctx, next) {

<<<<<<< HEAD
 
  ctx.state = {
      movie_description: {
        id:2,
        movie_id:3,
        chinese_name:'木乃伊',
        english_name:'the munny',
        img_url: 'http://p1.meituan.net/movie/4185bf22758d232e15c5bf52f89a7553867763.png@464w_644h_1e_1c',
        type:'动作，冒险，奇幻',
        region:'美国',
        length:'106分钟',
        release_time:'2017-0609大陆上映',
        user_rating:8.0,
        professional_rating:5.7,
        box_office:'10.03亿',
        profile: `
<div class="module">
<div class="mod-title">
<h3>剧情简介</h3>
</div>
<div class="mod-content">
<span class="dra">这是一个世界首例放归野生草原狼的真实事件。一个出生于成都的女人李微漪在若尔盖草原偶然拯救了一只出生仅五天的小狼崽，从此与狼一起生活的酸甜苦辣，历时200天，送狼千里，最后成功放归狼重回狼群。</span>
</div>
</div>
        `,
        actors: `
<div class="module">
<div class="mod-title">
<h3>演职人员</h3>
<a class="more" href="#celebrity" data-act="all-actor-click">全部</a>
</div>
<div class="mod-content">
<div class="celebrity-container clearfix">

<div class="celebrity-group">
<div class="celebrity-type">
导演
</div>
<ul class="celebrity-list clearfix">
<li class="celebrity " data-act="celebrity-click" data-val="{celebrityid:28495}">
<a href="/films/celebrity/28495" target="_blank" class="portrait">
<img class="default-img" alt="" src="http://p1.meituan.net/movie/0a3be409c4d4d2f317dff1f1ae0d1f3246372.jpg@128w_170h_1e_1c">
</a>
<div class="info">
<a href="/films/celebrity/28495" target="_blank" class="name">
艾里克斯·库兹曼
</a>
</div>
</li>

</ul>
</div>


<div class="celebrity-group">
<div class="celebrity-type">
演员
</div>
<ul class="celebrity-list clearfix">
<li class="celebrity actor" data-act="celebrity-click" data-val="{celebrityid:28910}">
<a href="/films/celebrity/28910" target="_blank" class="portrait">
<img class="default-img" alt="" src="http://p1.meituan.net/movie/6afaea1cb4ca2b346e86e265347c78b833970.jpg@128w_170h_1e_1c">
</a>
<div class="info">
<a href="/films/celebrity/28910" target="_blank" class="name">
汤姆·克鲁斯
</a>
<br><span class="role">饰：尼克·莫顿
Nick Morton</span>
</div>
</li>

<li class="celebrity actor" data-act="celebrity-click" data-val="{celebrityid:5957}">
<a href="/films/celebrity/5957" target="_blank" class="portrait">
<img class="default-img" alt="" src="http://p1.meituan.net/movie/0c4e3a90ba473f7ab54ca0eaff11d35c42933.jpg@128w_170h_1e_1c">
</a>
<div class="info">
<a href="/films/celebrity/5957" target="_blank" class="name">
安娜贝拉·沃丽丝
</a>
<br><span class="role">饰：珍妮
Jenny Halsey</span>
</div>
</li>
=======
  let movie_id = ctx.params.movie_id;
>>>>>>> 0034e1885e9f31c38ea4301b2c6dd7c667e5ca87

  let movie_description = await movieModel.findOneMovieDescriptionByMovieId(movie_id);
  movie_description = movie_description[0];
  // console.log(movie_description);

  ctx.state = {
      movie_description,
      movie_remarks:[]
  };
  
   await ctx.render('movie-detail');

});

router.get('/:movie_id/cinemas', async function (ctx, next) {
    
  let movie_id = ctx.params.movie_id;

  let cinemas = await movieModel.findAllCinemasByMovieId(movie_id);
  let locations = await movieModel.findAllLocations();
  let movie_description = await movieModel.findOneMovieDescriptionByMovieId(movie_id);
  movie_description = movie_description[0];
  for (let cinema of cinemas) {
    cinema.shows = await movieModel.findAllShowsByCinemaId(cinema.id)
  }
  // console.log(cinemas);
  // console.log(cinemas[0].shows);

  ctx.state = {
    title: 'Drivers 电影',
    movie_description,
    locations,
    cinemas,
    remarks: []
  };

  await ctx.render('cinema-list', {
    page_name: '电影院选择页面'
  });
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

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
          },
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
          },
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
          },
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
          },
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
          },
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

 
  ctx.state = {
      movie_description: {
        id:2,
        movie_id:3,
        chinese_name:'木来意',
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
      <span class="dra">令人闻风丧胆的“海上屠夫”萨拉查船长 （哈维尔·巴登 饰）竟率领着一众夺命亡灵水手逃出了百慕大三角区。他们扬言要杀尽世上所有的海盗，头号目标就是杰克船长（约翰尼·德普 饰）。要想改写命运，杰克船长唯一的希望就是找到传说中海神波塞冬的三叉戟，拥有它就能拥有统治整个海洋的力量！为了寻获这件神器，杰克船长和聪明美丽的天文学家卡琳娜·史密斯（卡雅·斯考达里奥 饰）以及固执的年轻皇家海军亨利（布兰顿·思怀兹 饰）联手出击。航行着他那破破烂烂的“死海鸥号”，杰克船长不但决心要改变自己的厄运，同时也力求能从史上最狠毒可怕的敌人那里捡回一条命。</span>
    </div>
</div>
        `,
        actors: `
<div class="celebrity-container">
<div class="celebrity-group">
<div class="celebrity-type">
导演
<span class="num">（2）</span>
</div>
</div>
</div>
        `,
        pictures:`
<ul class="clearfix">
<li>
<img class="default-img" data-act="movie-img-click" data-src="http://p1.meituan.net/movie/f4889b99fac4737a53292dec718cffc7111480.jpg@106w_106h_1e_1c" alt="">
</li>
</ul>
        `
      },
      movie_remarks:[
        {
            id:2,
            user_id:4,
            movie_id:3,
            comment:'好看',
            rating:'5',
            time:'2017-05-03',
            praise:19
        },
        {
            id:2,
            user_id:4,
            movie_id:3,
            comment:'好看',
            rating:'5',
            time:'2017-05-03',
            praise:19
        },
        {
            id:2,
            user_id:4,
            movie_id:3,
            comment:'好看',
            rating:'5',
            time:'2017-05-03',
            praise:19
        } 
      ]
  };
  
   await ctx.render('movie-detail');
});

router.get('/:movie_id/cinemas', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影',
    movie: {
      chinese_name: 'xx 电影'
    },
    remarks: [
    {},
    {},
    {},
    {},
    {},
    {}
    ],
    locations: [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
    ],
    cinemas: [
    {},
    {},
    {},
    {},
    {},
    {},
    {}
    ],
    rooms: [
    {},
    {},
    {}
    ]
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

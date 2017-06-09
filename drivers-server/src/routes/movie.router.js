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

<li class="celebrity actor" data-act="celebrity-click" data-val="{celebrityid:28312}">
<a href="/films/celebrity/28312" target="_blank" class="portrait">
<img class="default-img" alt="" src="http://p0.meituan.net/movie/3a0e1b194b26fdcc7c20def9c9ada32739348.jpg@128w_170h_1e_1c">
</a>
<div class="info">
<a href="/films/celebrity/28312" target="_blank" class="name">
罗素·克劳
</a>
<br><span class="role">饰：亨利博士
Dr. Henry Jekyll</span>
</div>
</li>

<li class="celebrity actor" data-act="celebrity-click" data-val="{celebrityid:12171}">
<a href="/films/celebrity/12171" target="_blank" class="portrait">
<img class="default-img" alt="" src="http://p0.meituan.net/movie/3115d8e43d05f837e081af4caf51bee260931.jpg@128w_170h_1e_1c">
</a>
<div class="info">
<a href="/films/celebrity/12171" target="_blank" class="name">
索菲亚·波多拉
</a>
<br><span class="role">饰：公主阿玛内特</span>
</div>
</li>

</ul>
</div>

</div>

</div>
</div>
        `,
        pictures:`
<div class="module">
<div class="mod-title">
<h3>图集</h3>
<a class="more" href="#img" data-act="all-photo-click">全部</a>
</div>
<div class="mod-content">
<div class="album clearfix" data-act="movie-img-click">
<div class="img1"><img class="default-img" alt="" src="http://p0.meituan.net/movie/53ddba218421f5d1d72286ce9b19d01285084.jpg@465w_258h_1e_1c"></div>
<div class="img2"><img class="default-img" alt="" src="http://p0.meituan.net/movie/c6913b9adb0f871d47b5e820a339b1c791344.jpg@126w_126h_1e_1c"></div>
<div class="img3"><img class="default-img" alt="" src="http://p0.meituan.net/movie/dd96523bead593c70f76611cfd877f75146147.jpg@126w_126h_1e_1c"></div>
<div class="img4"><img class="default-img" alt="" src="http://p1.meituan.net/movie/e30dacb8fa6194b863eb5108d44dab12131619.jpg@126w_126h_1e_1c"></div>
<div class="img5"><img class="default-img" alt="" src="http://p0.meituan.net/movie/1cb134f73d2a970e12d523741dc3779d141373.jpg@126w_126h_1e_1c"></div>
</div>

</div>
</div>
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
        } 
      ]
  };
  
   await ctx.render('movie-detail');
});

router.get('/:movie_id/cinemas', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影',
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

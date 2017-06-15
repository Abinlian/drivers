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

  let movie_id = ctx.params.movie_id;

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

router.get('/:movie_id/cinemas/:cinema_id/rooms/:room_id/confirm', async function (ctx, next) {
    
  ctx.state = {
    title: 'Drivers 电影'
  };

  await ctx.render('confirm', {
    page_name: '确认订单'
  });
  
});

module.exports = router;

const router = require('koa-router')();

const movieModel = require('../models/movie.model');

router.get('/', async function (ctx, next) {
  
  let movies = await movieModel.findAllMovies();

  ctx.state = {
      movies
  };

  await ctx.render('movie-list');

});

router.get('/:movie_id', async function (ctx, next) {

  let movie_id = ctx.params.movie_id;

  let movie_description = await movieModel.findOneMovieDescriptionByMovieId(movie_id);
  movie_description = movie_description[0];

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

  ctx.state = {
    title: 'Drivers 电影',
    movie_description,
    locations,
    cinemas,
    remarks: []
  };

  await ctx.render('cinema-list');
});

router.get('/:movie_id/cinemas/:cinema_id/shows/:show_id', async function (ctx, next) {
  let user_id = ctx.session.user.id;
  let show_id = ctx.params.show_id;
  let show = await movieModel.findOneShowByShowId(show_id);
  show = show[0];
  let seats = await movieModel.findAllSeatsByRoomId(show.room_id);
  let self_seats = await movieModel.findSeatsSelectedBySelfByShowId(show_id, user_id);
  self_seats = JSON.stringify(self_seats);
  let others_seats = await movieModel.findSeatsSelectedByOthersByShowId(show_id, user_id);
  others_seats = JSON.stringify(others_seats);

  ctx.state = {
    title: 'Drivers 电影',
    seats,
    self_seats,
    others_seats
  };

  await ctx.render('seat-select-page');
  
});

router.get('/:movie_id/cinemas/:cinema_id/shows/:show_id/confirm/:jseat_select', async function (ctx, next) {
  let movie_id = ctx.params.movie_id;
  let cinema_id = ctx.params.cinema_id;
  let show_id = ctx.params.show_id;
  let jseats = ctx.params.jseat_select;

  let movie = await movieModel.findOneMovieByMovieId(movie_id);
  movie = movie[0];
  let cinema = await movieModel.findOneCinemaByCinemaId(cinema_id);
  cinema = cinema[0];
  let show = await movieModel.findOneShowByShowId(show_id);
  show = show[0];
  let room = await movieModel.findOneRoomByRoomId(show.room_id);
  room = room[0];
  
  ctx.state = {
    title: 'Drivers 电影',
    show,
    movie,
    room,
    cinema,
    jseats
  };

  await ctx.render('confirm');
  
});

module.exports = router;

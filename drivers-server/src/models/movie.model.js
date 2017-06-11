
const { execute } = require('../utils/db');

exports.findAllMovies = function () {
  const sql = `
    SELECT * FROM movie;
  `;
  return execute(sql);
}

exports.findOneMovieDescriptionByMovieId = function (movie_id) {
  const sql = `
    SELECT * FROM movie_desciption WHERE movie_id = ?;
  `;
  return execute(sql, [movie_id]);
}

exports.findAllCinemasByMovieId = function (movie_id) {
  const sql = `
    SELECT * FROM cinema
    WHERE id IN (
        SELECT cinema_id FROM room
        WHERE id IN (
            SELECT room_id FROM \`show\` WHERE movie_id = ?
        )
    )
    ;
  `;
  return execute(sql, [movie_id]);
}

exports.findAllLocations = function () {
  const sql = `
    SELECT * FROM location;
  `;
  return execute(sql);
}

exports.findAllShowsByCinemaId = function (cinema_id) {
  const sql = `
    SELECT \`show\`.id as show_id, \`show\`.room_id as room_id, \`show\`.movie_id as movie_id, \`show\`.time as show_time, \`show\`.language as show_language, \`show\`.price as show_price,
    room.cinema_id as cinema_id, room.name as room_name,
    cinema.location_id as location_id, cinema.name as cinema_name, cinema.rating as cinema_rating, cinema.address as cinema_address
    FROM cinema
    LEFT JOIN room
    ON room.cinema_id = cinema.id
    LEFT JOIN \`show\`
    ON \`show\`.room_id = room.id
    WHERE cinema.id = ?
    ;
  `;
  return execute(sql, [cinema_id]);
}

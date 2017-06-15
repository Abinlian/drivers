
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

exports.findOneShowByShowId = function (show_id) {
  const sql = `
    SELECT * FROM \`show\`
    WHERE id = ?
    ;
  `;
  return execute(sql, [show_id]);
}

exports.findAllSeatsByRoomId = function (room_id) {
  const sql = `
    SELECT * FROM seat
    WHERE room_id = ?
    ;`
  ;
  return execute(sql, [room_id]);
}

exports.findSeatsSelectedByOthersByShowId = function (show_id, user_id) {
  const sql = `
    SELECT * FROM seat
    WHERE id IN (
      SELECT seat_id FROM reserve_seat
      WHERE show_id = ?
      AND resevation_id IN (
        SELECT id FROM reservation
        WHERE user_id != ?
      )
    )
    ;`
  ;
  return execute(sql, [show_id, user_id]);
}

exports.findSeatsSelectedBySelfByShowId = function (show_id, user_id) {
  const sql = `
    SELECT * FROM seat
    WHERE id IN (
      SELECT seat_id FROM reserve_seat
      WHERE show_id = ?
      AND resevation_id IN (
        SELECT id FROM reservation
        WHERE user_id = ?
      )
    )
    ;`
  ;
  return execute(sql, [show_id, user_id]);
}

exports.findOneMovieByMovieId = function (movie_id) {
  const sql = `
    SELECT * FROM movie
    WHERE id = ?
    ;`
  ;
  return execute(sql, [movie_id]);
}

exports.findOneCinemaByCinemaId = function (cinema_id) {
  const sql = `
    SELECT * FROM cinema
    WHERE id = ?
    ;`
  ;
  return execute(sql, [cinema_id]);
}

exports.findOneRoomByRoomId = function (room_id) {
  const sql = `
    SELECT * FROM room
    WHERE id = ?
    ;`
  ;
  return execute(sql, [room_id]);
}

exports.findOneSeat = function (room_id, seat_row, seat_col) {
  const sql = `
    SELECT id FROM seat
    WHERE room_id = ?
      AND row_ = ?
      AND column_ = ?
    ;`
  ;
  return execute(sql, [room_id, seat_row, seat_col]);
}

exports.checkSeatInvalid = function (show_id, seat_id) {
  const sql = `
    SELECT COUNT(*) FROM reserve_seat
    WHERE show_id = ?
    AND seat_id = ?
    ;`
  ;
  return execute(sql, [show_id, seat_id]);
}

exports.insertPayment = function (name, price) {
  const sql = `
    INSERT INTO payment(name, price)
    VALUES(?, ?)
    ;`
  ;
  return execute(sql, [name, price]);
}

exports.insertReservation = function (user_id, payment_id, movie_id, show_id) {
  const sql = `
    INSERT INTO reservation(user_id, payment_id, movie_id, show_id)
    VALUES(?, ?, ?, ?)
    ;`
  ;
  return execute(sql, [user_id, payment_id, movie_id, show_id]);
}

exports.insertReserveSeat = function (reservation_id, show_id, seat_id) {
  const sql = `
    INSERT INTO reserve_seat(resevation_id, seat_id, show_id)
    VALUES(?, ?, ?)
    ;`
  ;
  return execute(sql, [reservation_id, seat_id, show_id]);
}

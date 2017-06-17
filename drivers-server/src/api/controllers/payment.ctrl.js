const userModel = require('../../models/user.model');
const movieModel = require('../../models/movie.model');

exports.pay = async (ctx, next) => {
	if (!ctx.session.user) {
		ctx.body = {
	    status: 530,
	    message: '登录超时'
	  }
		return;
	}
	let user_id = ctx.session.user.id;
	let seats = ctx.request.body.seats;
	let shows = ctx.request.body.shows;
	let countSeatInvail = 0;
	for (let i = 0; i < seats.length; ++i) {
	  let item = seats[i];
	  let seat = await movieModel.findOneSeat(shows.room_id, item.row, item.col);
	  seat = seat[0];
	  let checkSeat = await movieModel.checkSeatInvalid(shows.id, seat.id);
	  countSeatInvail += checkSeat[0]['COUNT(*)'];
	}

	if (countSeatInvail > 0) {
		// 座位已被他人预约
	  ctx.body = {
	    status: 1001,
	    message: '选座已被预约，请重新选座'
	  }
	} else {
		let user = await userModel.findOneById(user_id);
		user = user[0];
		let name = user.username;
		let price = seats.length * shows.price;
		let movie_id = shows.movie_id;
		let show_id = shows.id;
		let insertPayment = await movieModel.insertPayment(name, price);
		let payment_id = insertPayment.insertId;
		let insertReservation = await movieModel.insertReservation(user_id, payment_id, movie_id, show_id);
		let reservation_id = insertReservation.insertId;

		for (let i = 0; i < seats.length; ++i) {
		  let item = seats[i];
		  let seat = await movieModel.findOneSeat(shows.room_id, item.row, item.col);
		  seat = seat[0];
		  let insertReserveSeat = await movieModel.insertReserveSeat(reservation_id, shows.id, seat.id);
		}

		ctx.body = {
	    status: 200,
	    message: '购买成功'
	  }
	}
}
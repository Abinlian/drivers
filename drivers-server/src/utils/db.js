const config = require('../config/config');
const mysql = require('mysql');
const Promise = require("bluebird");

// Note that the library's classes are not properties of the main export
// so we require and promisifyAll them manually
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let Conn = mysql.createConnection(config.db);

exports = module.exports = {
  execute
};

function execute(sql, values) {
  return Conn.queryAsync(sql, values);
}



// for postgres
// const config = require('../config/config');
// const pgp = require('pg-promise')();

// const db = pgp(config.db);

// exports = module.exports = {
//   execute
// };

// function execute(sql, values) {
//   return db.any(sql, values);
// }

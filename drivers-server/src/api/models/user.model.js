const { execute } = require('../../utils/db');

exports.findOneById = function (id) {
  const sql = `
    SELECT * FROM user WHERE id = ?;
  `;
  return execute(sql, [id]);
}

exports.findOneByUsername = function (username) {
  const sql = `
    SELECT * FROM user WHERE username = ?;
  `;
  return execute(sql, [username]);
}

exports.findCountByUsername = function (username) {
  const sql = `
    SELECT COUNT(*) AS count FROM user WHERE username = ?;
  `;
  return execute(sql, [username]);
}

exports.create = function (username, password_hash) {
  const sql = `
    INSERT INTO user (username, password_hash) VALUES (?, ?);
  `;
  return execute(sql, [username, password_hash]);
}

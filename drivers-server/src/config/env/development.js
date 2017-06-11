/**
 *
 * 开发环境下的配置文件
 *
 */

const path = require('path');

module.exports = {
  root: path.join(__dirname, '..', '..'),
  url: 'http://localhost:8000',
  port: 8000,
  userSalt: 'drivers-sault',
  sessionKey: 'drivers-session-key',
  db: {
    host: '118.89.35.14',
    port: 3306,
    database: 'driversdb',
    user: 'drivers',
    password: 'drivers-123456'
  }
};

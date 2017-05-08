/**
 *
 * 根据NODE_ENV变量加载不同的配置数据
 *
 */

module.exports = require('./env/' + process.env.NODE_ENV);

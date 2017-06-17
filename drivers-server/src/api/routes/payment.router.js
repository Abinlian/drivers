const router = require('koa-router')();

const paymentCtrl = require('../controllers/payment.ctrl');

router.post('/', paymentCtrl.pay);

module.exports = router;
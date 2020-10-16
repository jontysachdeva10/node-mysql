const express = require('express');
const router = express.Router();
const {orderDetails, placeOrder} = require('../controller/customer/order');

router.post('/', orderDetails);

router.post('/place-order', placeOrder)

module.exports = router;
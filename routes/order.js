const express = require('express');
const router = express.Router();
const {orderDetails} = require('../controller/customer/order');

/**
 * @desc Place an Order
 * 
 * @route POST /order
 */
router.post('/', orderDetails);

module.exports = router;
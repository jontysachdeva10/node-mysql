const express = require('express');
const router = express.Router();
const {check } = require('express-validator');
const { registerUser } = require('../controller/login-registeration/register');
const { loginUser } = require('../controller/login-registeration/login');

/**
 * @desc Register User
 * 
 * @route POST /register
 */
router.post('/', [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Enter password of 6 or more char').isLength({min:6})
], registerUser);

/**
 * @desc Login User
 * 
 * @route GET /register
 */
router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
],loginUser);

module.exports = router;
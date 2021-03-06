const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {getRole, checkRole} = require('../middleware/role');
const {addProduct, getProduct, removeProduct, updateProduct} = require('../controller/admin/product');

/**
 * @desc Add Product
 * 
 * @route POST /product
 */
router.post('/', [checkRole, [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('currency', 'Currency is required').not().isEmpty()
]], addProduct);

/**
 * @desc Get All Products
 * 
 * @route GET /product
 */
router.get('/', checkRole, getProduct);

/**
 * @desc Delete Product by id
 * 
 * @route DELETE /product
 */
router.delete('/:id', checkRole, removeProduct);

/**
 * @desc Update Product by id
 * 
 * @route PUT /product
 */
router.put('/:id', checkRole, updateProduct);

module.exports = router;
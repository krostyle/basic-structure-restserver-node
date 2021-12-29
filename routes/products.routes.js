const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products.controllers');
const { isProductExist } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validation');
const { isAdminRole } = require('../middlewares/validate-role');


const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(isProductExist),
    validateFields
], getProduct);

router.post('/', [
    validateJwt,
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('category', 'The category is required').not().isEmpty(),
    validateFields
], createProduct)

router.put('/:id', [
    validateJwt,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(isProductExist),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJwt,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(isProductExist),
    isAdminRole,
    validateFields,
], deleteProduct);


module.exports = router;
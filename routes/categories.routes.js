const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories.controllers');
const { isCategoryExist } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validation');
const { isAdminRole } = require('../middlewares/validate-role');


const router = Router();

//All categories Public
router.get('/', getCategories);

//One category Public
router.get('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(isCategoryExist),
    validateFields
], getCategory);

//Create category Private All
router.post('/', [
        validateJwt,
        check('name', 'The name is required').not().isEmpty(),
        validateFields
    ],
    createCategory)

//Update category Private All
router.put('/:id', [
    validateJwt,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(isCategoryExist),
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], updateCategory);

//Delete category Private Admin User
router.delete('/:id', [
    validateJwt,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(isCategoryExist),
    isAdminRole,
    validateFields,
], deleteCategory);




module.exports = router;
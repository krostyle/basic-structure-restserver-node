const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategory } = require('../controllers/categories.controlles');
const { isCategoryExist } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validation');


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
router.put('/:id', (req, res) => {
    res.json('Update Category')
})

//Delete category Private Admin User
router.delete('/:id', (req, res) => {
    res.json('Delete Category')
})




module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validation');
const { createUser, updateUser, getUsers, deleteUser } = require('../controllers/users.controllers');
const { isRoleValid, isEmailExist, isUserExist } = require('../helpers/db-validators');


const router = Router();

router.get('/', getUsers)

router.post('/', [
        check('email', 'A valid email is required').isEmail(),
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('role').custom(isRoleValid),
        check('email').custom(isEmailExist),
        // check('role', 'role is not valid').isIn(['ADMIN', 'USER']),
        validateFields
    ],
    createUser)

router.put('/:id', [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isUserExist),
    validateFields
], updateUser)

router.delete('/:id', [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isUserExist),
    validateFields
], deleteUser)

router.patch('/', )





module.exports = router;
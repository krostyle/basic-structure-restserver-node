const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validation');
const { getUsers, createUser, putUsers, patchUsers, getDelete } = require('../controllers/users.controllers');
const { isRoleValid, isEmailExist } = require('../helpers/db-validators');


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

router.put('/:id', putUsers)

router.patch('/', patchUsers)

router.delete('/', getDelete)



module.exports = router;
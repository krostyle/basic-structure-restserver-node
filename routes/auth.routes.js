const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validation');

const router = Router();

router.post('/login', [
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);


module.exports = router;
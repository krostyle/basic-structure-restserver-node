const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controllers');
const { googleVerify } = require('../helpers/google-verify');
const { validateFields } = require('../middlewares/validation');

const router = Router();

router.post('/login', [
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);


router.post('/google', [
    check('id_token', 'Token is required').not().isEmpty(),
    validateFields
], googleSignIn);


module.exports = router;
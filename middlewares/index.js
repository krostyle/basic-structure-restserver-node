const validateFields = require('../middlewares/validation');
const validateJwt = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-role');


module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateRoles
}
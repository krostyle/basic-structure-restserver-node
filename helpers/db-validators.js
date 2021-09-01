const Role = require('../models/role');
const User = require('../models/user');
const isRoleValid = async(role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`Role ${role} does not exist`);
    }
}

// Verificar si el correo existe
const isEmailExist = async(email = '') => {
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new Error(`Email ${email} already exist`);
    }
}


module.exports = {
    isRoleValid,
    isEmailExist
}
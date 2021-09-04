const Role = require('../models/role');
const User = require('../models/user');
//VERIFICAR SI ES UN ROL VALIDO
const isRoleValid = async(role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`Role ${role} does not exist`);
    }
}

// VERIFICAR SI EL CORREO EXISTE
const isEmailExist = async(email = '') => {
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new Error(`Email ${email} already exist`);
    }
}

//VERIFICAR SI EL USUARIO EXISTE
const isUserExist = async(id = '') => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`User with ID: ${id} does not exist`);
    }
}


module.exports = {
    isRoleValid,
    isEmailExist,
    isUserExist
}
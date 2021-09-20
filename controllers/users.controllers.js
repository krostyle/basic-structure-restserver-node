//TRUCAZO
const { response, request } = require('express')
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createUser = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.json({
        msg: 'POST Usuario creado correctamente',
        user
    })
}

const updateUser = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...rest } = req.body;
    //VALIDAR EN LA BASE DE DATOS
    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    console.log(user);
    res.json({
        msg: 'PUT Usuario actualizado correctamente',
        user
    })
}


const getUsers = async(req = request, res = response) => {
    const { limit = 10, skip = 0 } = req.query;
    const query = { state: true };

    const usersPromise = User.find(query)
        .limit(Number(limit))
        .skip(Number(skip));
    const totalPromise = User.countDocuments(query);

    const [users, total] = await Promise.all([usersPromise, totalPromise]);

    res.json({
        total,
        users
    })
}

const deleteUser = async(req = request, res = response) => {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndUpdate(id, { state: false });
    const userAuth = req.user;

    if (userAuth.role === 'ADMIN') {
        res.json({
            msg: 'User deleted successfully',
            userDeleted
        })
    } else {
        res.json({
            msg: 'You do not have permissions to delete users'
        })
    }
}


module.exports = {
    createUser,
    updateUser,
    getUsers,
    deleteUser
}
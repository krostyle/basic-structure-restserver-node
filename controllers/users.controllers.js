//TRUCAZO
const { response, request } = require('express')
const bcrypt = require('bcryptjs');
const User = require('../models/user');



const getUsers = (req = request, res = response) => {
    res.json({
        msg: 'Get API Controller',
    })
}

const createUser = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.json({
        msg: 'Post API Controller',
        user
    })
}
const putUsers = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'Put API Controller',
        id
    })
}
const patchUsers = (req = request, res = response) => {
    res.json({
        msg: 'Patch API Controller'
    })
}
const getDelete = (req = request, res = response) => {
    res.json({
        msg: 'Delete API Controller'
    })
}

module.exports = {
    getUsers,
    createUser,
    putUsers,
    patchUsers,
    getDelete

}
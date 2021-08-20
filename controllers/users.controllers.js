//TRUCAZO
const { response, request } = require('express')


const getUsers = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'Get API Controller',
        query
    })
}

const postUsers = (req = request, res = response) => {
    res.json({
        msg: 'Post API Controller'
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
    postUsers,
    putUsers,
    patchUsers,
    getDelete

}
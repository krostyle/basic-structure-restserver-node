const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = async(req = request, res, next) => {
    // const token = req.headers.authorization;
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).send({
            message: 'Unauthorized Token does not exist'
        });
    }


    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(uid);
        if (!user || !user.state) {
            return res.status(401).send({
                message: 'Unauthorized User does not exist '
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: 'Unauthorized Error Invalid Token'
        });
    }
};


module.exports = { validateJwt };
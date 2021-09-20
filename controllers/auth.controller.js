const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateAuthToken } = require('../helpers/generate-jwt');


const login = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Validate email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'The email does not exist' });
        }
        // Check if user exists
        if (!user.state) {
            return res.status(400).json({ msg: 'The user is inactive' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'The password is incorrect' });
        }
        // Generate JWT
        const token = await generateAuthToken(user.id);
        res.json({ user, token });
    } catch (error) {

    }



};

module.exports = {
    login
};
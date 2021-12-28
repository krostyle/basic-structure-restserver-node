const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateAuthToken } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


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
        console.log(error);
        res.status(500).send('Server error');
    }
};


const googleSignIn = async(req = request, res = response) => {
    const { id_token } = req.body;
    try {
        const { name, email, avatar } = await googleVerify(id_token)
        const user = await User.findOne({ email });
        if (!user) {
            const newUser = new User({
                name,
                email,
                avatar,
                password: ' ',
                google: true
            });
            await newUser.save();
            const token = await generateAuthToken(newUser.id);
            res.json({ user: newUser, token });
        } else {
            if (!user.state) {
                return res.status(401).json({ msg: 'The user is inactive' });
            }
            const token = await generateAuthToken(user.id);
            res.json({ user, token });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send('Token Error : Verify');
    }


}

module.exports = {
    login,
    googleSignIn
};
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    state: {
        type: Boolean,
        required: [true, 'State is required'],
        enum: [true, false],
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);
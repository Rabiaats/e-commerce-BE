"use strict";

const { type } = require('os');
const { mongoose } = require('../configs/dbConnection');
const passwordEncrypt = require('../helpers/passwordEncrypt');

const UserSchema = new mongoose.Schema({
    
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    resetPassCode: String,

    resetPassExpires: Date

}, {
    collection: 'users',
    timestamps: true
});

UserSchema.pre(['save', 'updateOne'], function (next) {

    // updateOne: _update, save: this
    const data = this?._update ?? this

    // Email Validation:
    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if (!isEmailValidated) {
        next(new Error('The email address format is invalid. Please enter a valid email address.'));
    }

    const isPasswordValidated = data.password ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/.test(data.password) : true

    if (!isPasswordValidated) next(new Error('Password must be at least 8 characters long and contain at least one special character and  at least one uppercase character.'));

    if (data.password) data.password = passwordEncrypt(data.password)

    next();
});


module.exports = mongoose.model('User', UserSchema);
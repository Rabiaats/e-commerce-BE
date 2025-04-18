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

module.exports = mongoose.model('User', UserSchema);
"use strict";

const { mongoose } = require('../configs/dbConnection');

const TokenSchema = new mongoose.Schema({

    userId: { // default relation in mongoDB - many to one
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // one to one
        index: true
    },

    token: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true
    }

}, {
    collection: 'tokens',
    timestamps: true
});


module.exports = mongoose.model('Token', TokenSchema);
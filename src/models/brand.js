"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const BrandSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

}, {
    collection: 'brands',
    timestamps: true
})

module.exports = mongoose.model('Brand', BrandSchema);
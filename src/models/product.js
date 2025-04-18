"use strict";

const {mongoose} = require('../configs/dbConnection')
const sizeCategory = require('../helpers/size');

const ProductSchema = new mongoose.Schema({

    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    images:[
        {
            type:String,
            required: true,
            trim: true
        }
    ],
    
    size: {
        type: String,
        validate: {
            validator: function (value) {
                const sizes = sizeCategory[this.category];
                if (!sizes) {
                    throw new Error(`The size options fot the category are not defined`);
                }
                      
                return sizes.includes(value)
            }
        },
        required: true,
        ytrim: true,
    },

    color: {
        type: String,
        required: true,
        trim: true
    },
    
    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        default: 0,
        required: true
    },

    subCategory: {
            type: String,
            enum: ['woman', 'man', 'none'],
            required: true
    },

    popularity: {
        type: []
    },

}, {
    collection: 'products',
    timestamps: true
})


module.exports = mongoose.model('Product', ProductSchema)
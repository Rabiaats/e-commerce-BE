"use strict"

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],

    address: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
        type: Number,
        default: 0,
        required: true
    },
    
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    
    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'Stripe'],
      default: 'COD'
    },

    payment: {
      type: Boolean,
      required: true,
      default: false
    }

}, {
    collection: 'orders', 
    timestamps: true 
});





module.exports = mongoose.model('Order', OrderSchema);

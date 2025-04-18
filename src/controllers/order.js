"use strict"

const Order = require('../models/order');
const User = require('../models/user')
const Stripe = require('stripe');

const create = require('../services/orderCreate');
const quantity = require('../services/statusQuantity');

const CURRENCY = 'TRY'
const DELIVERY_CHARGE = 55

const stripe = new Stripe(process.env.STRIPE_KEY)


module.exports = {

    list: async(req, res) => {

        let customFilter = [];

        if(!req.user.isAdmin){
            customFilter = {userId: req.user._id, status: {$ne: 'Pending'} }
        }

        const result = await Order.findOne({_id: req.params.id, ...customFilter}).populate([
            {path: 'userId', select: 'email firstname lastname phone'},
            {path: 'products', populate: {path: 'productId'}},
        ])

        res.status(200).send({
            error: false,
            result
        })
    },
    
    
    read: async(req, res) => {
        
        let customFilter = [];
        
        if(!req.user.isAdmin){
            customFilter = {userId: req.user._id}
        }
        
        const result = await Order.findOne({_id: req.params.id, ...customFilter}).populate([
            {path: 'userId', select: 'email firstname lastname phone'},
            {path: 'products', populate: {path: 'productId'}},
        ])
        
        res.status(200).send({
            error: false,
            result
        })
        
    },
    
    update: async(req, res) => {

        try {
            
            const { orderId, status} = req.body;

            const result = await Order.findOneAndUpdate({_id: orderId}, {status}, {new: true})

            res.status(202).send({
                error: false,
                message: 'Status updated',
                result
            })

        } catch (err){
            
            res.status(404).send({
                error: false,
                message: err.message
            })
        }
        
    },
    
    // cancelled order
    deletee: async(req, res) => {
        
        let customFilter = [];
        
        if(!req.user.isAdmin){
            customFilter = {userId: req.user._id}
        }
        
        const data = await Order.findOne({_id: req.params.id, ...customFilter});
        
        if(customFilter.length > 0 && !data.status !== 'Pending'){
            res.status(404).send({
                error: true,
                message: 'You cannot cancel because your order has been confirmed'
            })
        }
        
        const result = await Order.findOneAndUpdate(
            {_id: data._id},
            {$set: {status: 'cancelled'}},
            {new: true}
        );
        
        
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            result,
        })
    },
    
    //COD
    paymentCOD: async(req, res) => {
        
        req.body.userId = req.user._id;

        const items = req.session.cart;

        items = await quantity(items);
        
        const result = await create(req.body.userId, items, 'COD', 'Preparing')

        req.session.cart = []

        await sendMail(
            process.env.ADMIN_EMAIL,
            'New Paid Order Received',
            `<h3>New order info:  ${result}</h3>`
        );
        
        await sendMail(
            result.userId.email,
            'New Paid Order Received',
            `<h3>Your order number ${orderId} has been created and is being prepared</h3>`
        );

        
        res.status(200).send({
            error: false,
            result
        })
    },
    
    // stripe
    paymentStripe: async(req, res) => {
        
        try{
            
            const {origin} = req.headers;
            
            req.body.userId = req.user._id;
            const items = req.session.cart;

            items = await quantity(items);

            const result = await create(req.body.userId, items, 'Stripe', 'Preparing')
            
            const line_items = items.map((item) => ({
                price_data: {
                    currency: CURRENCY,
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }))
            
            line_items.push({
                price_data: {
                    CURRENCY,
                    product_data: {
                        name: 'Delivery Charges'
                    },
                    unit_amount: DELIVERY_CHARGE*100
                },
                quantity: 1
            })
            
            const session = await stripe.checkout.sessions.create({
                // odeme bararili ile frontende success_url gider
                success_url: `${origin}/verify?success=true&orderId=${result._id}`,
                cancel_url: `${origin}/verify?success=false&orderId=${result._id}`,
                line_items,
                mode: 'payment',
            })
            
            res.status(200).send({
                error:false,
                sesion_url: session.url
            })
            
            
        }catch{
            
            res.status(404).send({
                error: true,
                message: 'An error occurred during paying!'
            })
            
        }
        
    },

    verifyStripe: async(req,res) => {
        
        const {orderId, success} = req.body;
        
        try {
            
            if(success === 'true'){
                const result = await Order.findByIdAndUpdate(orderId, {payment: true},{new: true}).populate([
                    {path: 'userId', select:'email firstname lastname phone' },
                    { path: 'products', populate: { path: 'productId' } }
                ])
                req.session.cart = []

                await sendMail(
                    process.env.ADMIN_EMAIL,
                    'New Paid Order Received',
                    `<h3>New order info:  ${result}</h3>`
                );

                await sendMail(
                    result.userId.email,
                    'New Paid Order Received',
                    `<h3>Your order number ${orderId} has been created and is being prepared</h3>`
                );
    

                res.status(200).send({
                    error: false,
                    message: 'Your payment was successful. Your order has been confirmed!'
                })
            }else {
                await Order.findByIdAndDelete(orderId)
                res.status(404).send({
                    error: true,
                    message: 'Payment was not completed. Your order has been cancelled.'
                })
            }
            
        } catch (err){
            res.status(404).send({
                error: true,
                message: 'An error occurred while verifying the payment.',
                details: err.message
            })
        }
        
        
    }
}
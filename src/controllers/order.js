"use strict"

const Order = require('../models/order');
const User = require('../models/user')
const Stripe = require('stripe');

const sendMail = require('../helpers/sendMail')
const create = require('../services/orderCreate');
const {increase} = require('../services/controlStock')

const CURRENCY = 'TRY'
const DELIVERY_CHARGE = 55

const stripe = new Stripe(process.env.STRIPE_KEY)


module.exports = {

    
    /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "List Orders"
        #swagger.description = `
            You can send query parameters with the endpoint to filter[], search[], sort[], page, and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    list: async(req, res) => {

        let customFilter = [];

        if(!req.user.isAdmin){
            customFilter = {userId: req.user._id, status: {$ne: 'Pending'} }
        }

        const result = await res.getModelList(Order, customFilter, [
            {path: 'userId', select: 'email firstname lastname phone'},
            {path: 'products', populate: {path: 'productId'}},
        ])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Order, customFilter),
            result
        })
    },
    
    
    read: async(req, res) => {

        /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "Get Order Details"
        #swagger.description = `
            Fetch the details of a specific order by ID.
            <ul> Example:
                <li>URL/:id</li>
            </ul>
        `
    */

        
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

        /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "Update Order Status"
        #swagger.description = `
            Update the status of an existing order.
            <ul> Example:
                <li>URL/:id - PUT request</li>
                <li>Body: { "orderId": "123", "status": "Shipped" }</li>
            </ul>
        `
    */

        try {
            
            const { orderId, status} = req.body;

            const result = await Order.findOneAndUpdate({_id: orderId}, {status}, {new: true})

            if(result.status === 'Cancelled'){
                await increase(result.items)
            }

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
    cancel: async(req, res) => {

        /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "Cancel Order"
        #swagger.description = `
            Cancel an order if it has not been confirmed.
            <ul> Example:
                <li>URL/:id - DELETE request</li>
                <li>Body: { "orderId": "123"} || req.params${id}</li>
            </ul>
        `
    */

        let {id} = req.params.id;

        if(!req.params.id){
            id = req.body.productId   
        }
        
        const result = await Order.findOneAndUpdate(
            {_id: id},
            {$set: {status: 'cancelled'}},
            {new: true}
        );
        
        await increase(result.items)
        
        res.status(result ? 204 : 404).send({
            error: !result,
            result,
        })
    },
    
    //COD
    paymentCOD: async(req, res) => {

         /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "Payment by Cash on Delivery"
        #swagger.description = `
            Create a new order with "Cash on Delivery" payment method.
           <ul> Example usage:
            <li>POST /paymentCOD</li>
            <li>Body: {"address": "Sokak, Mahalle, Bina\\nŞehir Posta Kodu"}</li>
        </ul>
        `
           #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["address"],
                    properties: {
                        address: {
                            type: "string",
                            example: "nAtatürk Caddesi, Merkez Mahallesi, No:12 Daire:5\nİstanbul 34000"
                        }
                    }
                }
            }
        }
    }
    */
     
    if(!req.body.address){
        res.status(404).send({
            error: true,
            message: 'Please send address information'
        })
    }
        req.body.userId = req.user._id;

        let items = req.session.cart;
        
        const result = await create(req.body.userId, items, req.body.address, 'COD', 'Preparing')

        req.session.cart = []

        await sendMail(
            process.env.ADMIN_EMAIL,
            'New Paid Order Received',
            `<h3>New order info:  ${result}</h3>`
        );
        
        await sendMail(
            result.userId.email,
            'New Paid Order Received',
            `<h3>Your order number ${result._id} has been created and is being prepared</h3>`
        );

        
        res.status(200).send({
            error: false,
            result
        })
    },
    
    // stripe
    paymentStripe: async(req, res) => {

            /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "Payment by Cash on Delivery"
        #swagger.description = `
            Create a new order with "Cash on Delivery" payment method.
           <ul> Example usage:
            <li>POST /paymentCOD</li>
            <li>Body: {"address": "Sokak, Mahalle, Bina\\nŞehir Posta Kodu"}</li>
        </ul>
        `
           #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["address"],
                    properties: {
                        address: {
                            type: "string",
                            example: "nAtatürk Caddesi, Merkez Mahallesi, No:12 Daire:5\nİstanbul 34000"
                        }
                    }
                }
            }
        }
    }
    */
        
        try{
            
            if(!req.body.address){
                res.status(404).send({
                    error: true,
                    message: 'Please send address information'
                })
            }

            const {origin} = req.headers;
            
            req.body.userId = req.user._id;
            const items = req.session.cart;

            const result = await create(req.body.userId, items, req.body.address,'Stripe', 'Preparing')
            
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
                session_url: session.url
            })
            
            
        }catch(err){
            
            res.status(404).send({
                error: true,
                message: 'An error occurred during the payment process. Please try again later.',
                details: err.message
            });
            
            
        }
        
    },

    verifyStripe: async(req,res) => {

        /*
        #swagger.tags = ["Orders"]
        #swagger.summary = "Verify Stripe Payment"
        #swagger.description = `
            Verify the Stripe payment and update the order status accordingly.
            <ul> Example:
                <li>URL/verifyStripe - POST request</li>
                <li>Body: { "orderId": "123", "success": "true" }</li>
            </ul>
        `
        */
        
        const {orderId, success} = req.body;

        if (!orderId) {
            return res.status(404).send({
                error: true,
                message: 'Order ID is missing!'
            });
        }
        
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
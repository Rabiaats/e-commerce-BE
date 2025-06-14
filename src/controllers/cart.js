"use strict"

const Product = require('../models/product');
const User = require('../models/user');

module.exports = {

    addToCart: async(req, res) => {

        /*
            #swagger.tags = ["Cart"]
            #swagger.summary = "Add Product to Cart"
            #swagger.description = "Adds a product to the user's session-based cart."
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    quantity: 1
                }
            }
        */
        

            const {id} = req.params
            const {quantity = 1} = req.body

            if(!req.session.cart){
                req.sesion.cart = []
            }

            const product = await Product.findOne({_id: id});

            if(!product){
                throw new Error('Product was not found')
            }

            if (product.stock < quantity) {
                return res.status(400).send({ error: true, message: "There are not enough products in stock"});
            }

            if(req.session.cart.find(item => item.productId === product._id)){
                item.quantity += quantity
            }else {
                req.session.cart.push({productId: product._id, quantity, price: product.price})
            }
            
            res.status(200).send({
                error: false,
                message: "The product has been added to the cart",
                result: req.session.cart
            })
        
    },

    removeFromCart: async(req, res) => {

         /*
            #swagger.tags = ["Cart"]
            #swagger.summary = "Remove Product from Cart"
            #swagger.description = "Removes a product from the user's cart based on productId."
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    productId: "string"
                }
            }
        */
        
        if(!req.session.cart) {
            res.status(400).send({
                error: true,
                message: "The cart is empty"
            })
        }

        const product = await Product.findOne({_id: req.body.productId});
        
        if(!product){
            throw new Error('Product was not found')
        }

        req.session.cart = req.session.cart.filter(item => item.productId !== req.body.productId);


        if(req.session.cart.length == 0){
            res.status(200).send({ 
                error: false,
                message: "The cart is empty" 
            });
        }

        res.status(200).send({
            error: false,
            message: 'the product has been removed',
            result: req.session.cart
        })
    },

    updateCart: async(req, res) => {

         /*
            #swagger.tags = ["Cart"]
            #swagger.summary = "Update Product in Cart"
            #swagger.description = "Updates the quantity of a product in the cart."
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    productId: "string",
                    quantity: 2
                }
            }
        */

        if(!req.session.cart) {
            res.status(400).send({
                error: true,
                message: "The cart is empty",
                result:[]
            })
        }

        const product = await Product.findOne({_id: req.body.productId});
        
        if(!product){
            req.session.cart = req.session.cart.filter(item => item.productId !== req.body.productId);
            throw new Error('The product was not found and has been removed from your cart')
        }

        const item = req.session.cart.find(item => item.productId == req.body.productId);
        item.quantity = req.body.quantity;

        if(item.quantity === 0){
            req.session.cart = req.session.cart.filter(item => item.productId !== req.body.productId);
        }

        res.status(200).json({ 
            error: false,
            message: "The product has been updated", 
            result: req.session.cart 
        });

    },

    getUserCart: async(req, res) => {

         /*
            #swagger.tags = ["Cart"]
            #swagger.summary = "Get User Cart"
            #swagger.description = "Returns the user's current session-based cart."
        */

        res.status(200).send({
            error: false,
            result: req.session.cart || []
        })

    }

}
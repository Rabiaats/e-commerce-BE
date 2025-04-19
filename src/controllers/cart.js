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
                    productId: "string",
                    quantity: 1
                }
            }
        */
        

            const {productId, quantity = 1} = req.body

            if(!req.session.cart){
                req.sesion.cart = []
            }

            const product = await Product.findOne({_id: productId});

            if(!product){
                throw new Error('Product was not found')
            }

            if (product.quantity < quantity) {
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
            result: cart.session.cart
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

        const item = req.session.cart.find(item => item.productId == req.body.productId);
        item.quantity = req.body.quantity;

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
            result: req.seesion.cart || []
        })

    }

}
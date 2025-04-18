"use strict"

const Product = require('../models/product');
const {CustomError} = require('../errors/customError')
const fs = require('node:fs');
const requestIP = require("request-ip");
const encrypt = require("../helpers/passwordEncrypt");

module.exports = {

    list: async(req, res) => {

        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value1</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(Product, {}, [
            {path: 'categoryId', select: 'name -_id'},
            {path: 'brandId', select: 'name -_id'},
        ])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Product),
            result            
        })
    },

     create: async (req, res) => {
        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                $ref"#/definitions/Product"
                    }
                }
            */

                req.body.images = [];

                if(req.files){
                    for(let file of req.files){
                        req.body.images.push(file.path)
                    }
                };

            const result = await Product.create(req.body)
    
            res.status(201).send({
                error: false,
                result
            })
        },
    
        read: async (req, res) => {
            /*
                #swagger.tags = ["Products"]
                #swagger.summary = "Get Single Product"
            */

            const ip = encrypt(requestIP.getClientIp(req));
    
            const result = await Product.findOneAndUpdate(
                { _id: req.params.id },
                {$addToSet: {popularity: ip}},
                {new: true}
            ).populate([
                {path: 'categoryId', select: 'name -_id'},
                {path: 'brandId', select: 'name -_id'},
                { path: 'variants', select: 'images size color price stock' }
            ])
    
            res.status(200).send({
                error: false,
                result
            })
    
        },
    
        update: async (req, res) => {
            /*
                #swagger.tags = ["Products"]
                #swagger.summary = "Update Product"
                #swagger.parameters['body'] = {
                    in: 'body',
                    required: true,
                    schema: {
                    $ref"#/definitions/Product"
                    }
                }
            */

            if (req.files) {
                for (let file of req.files) {
                    req.body.image.push(file.path);
                }
            }
            
            const product = await Product.findOne({_id: req.params.id});
            
            if(product){
                const imagesToDelete = product.images.filter((deleteImagePath) => !req.body.image.includes(deleteImagePath));
                            
                imagesToDelete.forEach((imagePath) => {
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                });
            }else{
                throw new CustomError("This product could not be found")
            }

            const result = await Product.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
    
            res.status(202).send({
                error: false,
                result,
                new: await Product.findOne({ _id: req.params.id })
            })
    
        },
    
        deletee: async (req, res) => {
            /*
                #swagger.tags = ["Products"]
                #swagger.summary = "Delete Product"
            */
    
            const result = await Product.findOne({ _id: req.params.id })

            if(!result){
                throw new CustomError('This product could not be found')
            }

            await Product.deleteOne({_id : req.params.id})
    
            res.status(result.deletedCount ? 204 : 404).send({
                error: true,
                message: 'Something went wrong, result might be deleted already.'

            })
    
        },
}
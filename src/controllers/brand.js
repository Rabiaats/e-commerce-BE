"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Brand = require('../models/brand');

module.exports = {

    list: async(req, res) => {

        /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "List Brands"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(Brand)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Brand),
            result            
        })
    },

     create: async (req, res) => {
        /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Create Brand"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Brand"
                }
            }
            */

            const result = await Brand.create(req.body)
    
            res.status(201).send({
                error: false,
                result
            })
        },
    
        read: async (req, res) => {
            /*
                #swagger.tags = ["Brands"]
                #swagger.summary = "Get Single Brand"
            */
    
            const result = await Brand.findOne({ _id: req.params.id })
    
            res.status(200).send({
                error: false,
                result
            })
    
        },
    
        update: async (req, res) => {
            /*
                #swagger.tags = ["Brands"]
                #swagger.summary = "Update Brand"
                #swagger.parameters['body'] = {
                    in: 'body',
                    required: true,
                    schema: {
                        $ref:"#/definitions/Brand"
                    }
                }
            */
            const result = await Brand.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
    
            res.status(202).send({
                error: false,
                result,
                new: await Brand.findOne({ _id: req.params.id })
            })
    
        },
    
        deletee: async (req, res) => {
            /*
                #swagger.tags = ["Brands"]
                #swagger.summary = "Delete Brand"
            */
    
            const result = await Brand.deleteOne({ _id: req.params.id })
    
            res.status(result.deletedCount ? 204 : 404).send({
                error: true,
                message: 'Something went wrong, result might be deleted already.'
            })
    
        },
}
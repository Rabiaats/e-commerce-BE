"use strict"


const Category = require('../models/category');

module.exports = {

    list: async (req, res) => {
        /* 
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Categories"
        */

        const result = await res.getModelList(Category)

        res.status(200).send({
            error: false,
            result,
        })
    },

    // CRUD:
    create: async (req, res) => {
        /* 
            #swagger.ignore = true
        */

        const result = await Category.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Categories"]
           #swagger.summary = "Get Single Category"
        */

        const result = await Category.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.ignore = true
        */

        const result = await Category.updateOne({ _id: req.params.id }, req.body, { runValidators: true })


        res.status(202).send({
            error: false,
            result,
            new: await Category.findOne({ _id: req.params.id })
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.ignore = true
        */

        const result = await Category.deleteOne({ _id: req.params.id })

        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: 'Something went wrong, data might be deleted already.'
        })
    },

}
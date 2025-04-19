"use strict"

const router = require('express').Router();
const sizeCategory = require('../helpers/size');


router.get('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId
    if(!sizeCategory[categoryId]){
        return res.status(404).send({
            error: true,
            message: `The size options for the category are not defined`,
            sizes: sizeCategory[categoryId]
        });
    }

    res.send({
        error: false,
        categoryId,
        sizes: sizeCategory[categoryId]
    })
})

module.exports = router;
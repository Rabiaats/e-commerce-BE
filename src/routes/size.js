"use strict"

const router = require('express').Router();
const sizeCategory = require('../helpers/size');

const { isAdmin} = require('../middlewares/permissions');

router.get('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId
    if(!sizeCategory[categoryId]){
        return res.status(404).json({
            error: true,
            message: `The size options fot the category are not defined`,
        });
    }

    res.json({
        error: false,
        categoryId,
        sizes: sizeCategory[categoryId]
    })
})

module.exports = router;
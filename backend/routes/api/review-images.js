const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');


router.delete('/:imageId', requireAuth, async(req, res) => {
    const reviewImg = await ReviewImage.findByPk(req.params.imageId);

    if(!reviewImg){
        res.statusCode = 404;
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    await reviewImg.destroy();
    res.statusCode = 200;
    res.json({
        "message":"Successfully Deleted",
        "statusCode": 200
    })
})



module.exports = router;
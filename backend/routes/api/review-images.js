const express = require('express');
const router = express.Router();
const {ReviewImage,Review, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

//delete Review-Image

router.delete('/:imageId', requireAuth, async(req, res) => {
    const reviewImg = await ReviewImage.findByPk(req.params.imageId);

    if(!reviewImg){
        res.statusCode = 404;
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    
    const review = await Review.findOne({
        where: {
            userId: req.user.id,
            id: reviewImg.reviewId
        }
    })

    if(!review){
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
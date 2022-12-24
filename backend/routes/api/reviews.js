const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');



//create image for review

router.post('/:reviewId/images',requireAuth,  async(req, res) => {
    const reviewId = req.params.reviewId
    const { url } = req.body
    const review = await Review.findByPk(reviewId)

    if(!review){
        res.statusCode = 404;
        res.json({
            "mesage": "Review couldn't be found",
            "statusCode": 404
        })
    }

    //max 10 images
    const imgCount = await ReviewImage.count({
        where: { reviewId}
    });

    if(imgCount >= 10){
        res.statusCode = 403
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }
    const newImage = await ReviewImage.create({
        reviewId,
        url
    })

    const addImg = await ReviewImage.findByPk(newImage.id, {attributes:["id", "url"]})

    res.json(addImg)
})

//get reviews of current user

router.get('/current', requireAuth, async(req, res) => {
    const currentUser = req.user.id

    const Reviews = await Review.findAll({
        where: { userId: currentUser},
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: {exclude: ["description", "createdAt", "updatedAt"]}
            },
            {
                model: ReviewImage,
            }
        ],
        // group: ["Review.id", "User.id", "Spot.id", "ReviewImages.id"]
    })

    let userReview = [];
    //loop over reviews, edit and conver to json in 1 loop
    for(let review of Reviews){
        //convert to json
        const userReviews = review.toJSON();

        const previewImage = await SpotImage.findOne({
            where: {spotId: review.Spot.id, preview: true}
        });

        if(!previewImage){
            userReviews.Spot.previewImage = "no preview image found"
        } else {
            userReviews.Spot.previewImage = previewImage.url
        }

        const reviewImg = await ReviewImage.findAll({
            where: {reviewId: review.id},
            attributes: ["id", "url"]
        })
        
        review.ReviewImages = reviewImg

        userReview.push(userReviews)

    }
    res.json({Reviews: userReview})
})


module.exports = router;
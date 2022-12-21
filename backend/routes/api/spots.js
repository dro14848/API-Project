const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const spot = require('../../db/models/spot');


//get all spots
router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [Sequelize.col("SpotImages.url"), "previewImage"],
                [Sequelize.fn("AVG", sequelize.col("Reviews.stars")),"avgRating" ]
            ]
        },
        include: [
            
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        group: ["Spot.id"]
    })
    //test array for querys
    // let testArr = [];
    // //empty array to push json into
    // let spotList = [];
    // spots.forEach(spot => {
    //     spotList.push(spot.toJSON())
    // })

    
    // spotList.forEach(spot =>{
    //     spot.SpotImages.forEach(image => {
    //         // console.log(image.preview)
    //         if(image.preview === true){
    //             // console.log(image.url)
    //             spot.previewImage = image.url
                
    //         }
    //     })
    //     spot.Reviews.forEach(avg => {
    //         console.log(avg.stars)
    //     })
    //     delete spot.Reviews
    //     delete spot.SpotImages
    // })
    // console.log(testArr)

    //LAZY LOAD FOR LIVE
// find all spots
// loop through spots
// get avg rating
// get rest of data (avg, previewImage)
//push spot into payload
// res.json(payload)
    res.json({Spots: spots})
})

//create spot


router.post('/', requireAuth, async(req, res) => {
    //check owner
    const ownerId = req.user.id

    //create spot based on owner id
    const newSpot = await Spot.create({ownerId,...req.body})

    res.json(newSpot)
})


//create image for spot
router.post('/:spotid/images', requireAuth, async(req, res) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId)

    console.log(spot)
    if(!spot){
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found",
            "statusCode":"404"
        })
    }

    res.json(spotId)

})



module.exports = router;
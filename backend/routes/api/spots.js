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
        include: [
            
            {
                model: Review,
                // attributes: []
            },
            {
                model: SpotImage
            }
        ],
        attributes: {
            include: [
                // [Sequelize.col("SpotImages.url"), "previewImage"],
                [Sequelize.fn("AVG", sequelize.col("Reviews.stars")),"avgRating" ]
            ]
        },
        group: ["Spot.id", "Reviews.id", "SpotImages.id"]
    })

    let allspots = [];
    spots.forEach(spot => {

        allspots.push(spot.toJSON())
    })

    let listSpots = []
    allspots.forEach(async spot =>{
        //parse to int or will not work
       spot.avgRating = parseInt(spot.avgRating)
        spot.SpotImages.forEach(img => {
            console.log(img.url)
            if(img.preview === true){
                spot.previewImage = img.url
            }

        })
       if(!spot.avgRating){
        spot.avgRating = "No Reviews yet"
       }
       delete spot.SpotImages
       delete spot.Reviews
    })

    res.json({Spots: allspots})
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
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
            
            // {
            //     model: Review,
            //     // attributes: []
            // },
            {
                model: SpotImage
            }
        ],
    })

    let allspots = [];
    spots.forEach(spot => {

        allspots.push(spot.toJSON())
    })

   
    for (let i =0; i < allspots.length; i++) {
        let spot = allspots[i]

       const reviews = await Review.findAll({
        where:{
            spotId: spot.id
        },
        incldue: [
            {model: Review},
        ],
        attributes: {
            include: [
            [sequelize.fn("AVG", sequelize.col("Review.stars")), "avgRating"]
            ]
        },
        // raw: true,
        // group: ["Review.id"]
       })
    //    console.log(reviews)
       spot.avgRating = reviews[0].dataValues.avgRating
        spot.SpotImages.forEach(img => {
            console.log(img.url)
            if(img.preview === true){
                spot.previewImage = img.url
            }

        })
       if(!spot.avgRating){
        spot.avgRating = "No Reviews yet"
       }
       if(!spot.previewImage){
        spot.previewImage = "No Preview Image"
       }
       delete spot.SpotImages
       delete spot.Reviews
    }

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
router.post('/:spotId/images', requireAuth, async(req, res) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId)

    // console.log(spot)
    if(!spot){
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found",
            "statusCode":"404"
        })
    }

    const spotId = req.params.spotId;
    const newImage = await SpotImage.create({
        spotId,
        url,
        preview
    })

    const addImg = await SpotImage.findByPk(newImage.id,{attributes:['id', 'url', 'preview']})

    res.json(addImg)

})

//get current user
router.get('/current', requireAuth, async(req,res) => {
    const user = req.user;

    //find all spots to user

    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [
            {
                model:Review,
            },
            {
                model: SpotImage
            }
        ],
        group: ["Spot.id", "Reviews.id", "SpotImages.id"]
    })

    let userSpot = [];
    spots.forEach(user=>{
        userSpot.push(user.toJSON())
    })

    for (let i =0; i < userSpot.length; i++) {
        let spot = userSpot[i]

       const reviews = await Review.findAll({
        where:{
            spotId: spot.id
        },
        attributes: {
            include: [
            [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
            ]
        },
       })
    //    console.log(reviews)
       spot.avgRating = reviews[0].dataValues.avgRating
        spot.SpotImages.forEach(img => {
            console.log(img.url)
            if(img.preview === true){
                spot.previewImage = img.url
            }

        })
       if(!spot.avgRating){
        spot.avgRating = "No Reviews yet"
       }
       if(!spot.previewImage){
        spot.previewImage = "No Preview Image"
       }

       delete spot.SpotImages
       delete spot.Reviews
    }


    res.json({Spots: userSpot})
    


})

//get spot by spotId
router.get('/:spotId', async(req,res) => {
    const { spotId } = req.params

    let spots = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
                [sequelize.fn("COUNT", sequelize.col('Reviews.spotId')), "numReviews"]
            ]
        },
        group: ["Spot.id", "Reviews.id", "SpotImages.id", 'Owner.id']
    })

    // need to test live
    if(!spots){
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    console.log(spots)
    res.json(spots)
})

//edit spot
router.put('/:spotId', requireAuth, async(req, res)=> {
    
})

module.exports = router;
const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

//validators
//validate spot
const validateSpot = [
    check('address')
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .withMessage('City i required'),
    check('state')
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .isDecimal()
        .withMessage('LAtitude is not valid'),
    check('lng')
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .isLength({max:150})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .notEmpty()
        .withMessage('Decription is required'),
    check('price')
        .notEmpty()
        .isInt()
        .withMessage('Price per day is '),
    handleValidationErrors
]

//validate review
const validateReview = [
    check('review')
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .isInt({min:1, max:5})
        .withMessage('Stars mut be an integer from 1 to 5'),
    handleValidationErrors
]

//get all spots
router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        include: [
            
            {
                model: Review,
            },
            {
                model: SpotImage
            }
        ],
        group: ["Spot.id", "Reviews.id", "SpotImages.id"]
    })

    let allspots = [];
    spots.forEach(spot => {

        allspots.push(spot.toJSON())
    })

    for (let i =0; i < allspots.length; i++) {
        let spot = allspots[i]
        
        // console.log(allspots.reviews)
       const reviews = await Review.findAll({
        where:{
            spotId: spot.id
        },
        attributes:["stars"],
    
        raw: true,
       })
    //    console.log("test reviews",reviews)

       let count = 0
       reviews.forEach(rating =>{
        count += rating.stars
       })

       const avg = count/reviews.length;

    //    spot.avgRating = review[0].dataValues.avgRating
        spot.SpotImages.forEach(img => {
            console.log(img.url)
            if(img.preview === true){
                spot.previewImage = img.url
            }

        })
       if(!avg){
        spot.avgRating = "No Reviews yet"
       }else {
        spot.avgRating = avg
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
        attributes: ["stars"],
        raw: true,
       })
       let count = 0;
       reviews.forEach(rating =>{
        count += rating.stars
       })

       const avg = count/reviews.length

        spot.SpotImages.forEach(img => {
            console.log(img.url)
            if(img.preview === true){
                spot.previewImage = img.url
            }

        })
       if(!spot.avgRating){
        spot.avgRating = "No Reviews yet"
       }else {
        spot.avgRating = avg
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

    const spots = await Spot.findByPk(req.params.spotId, {
        raw:true
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
router.put('/:spotId', validateSpot, requireAuth, async(req, res)=> {
    const {address, city, state, country, lat, lng, name, description, price } = req.body;

    const change = await Spot.findByPk(req.params.spotId);
    if(!change){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    //need to add validation

    if(address) change.address = address;
    if(city) change.city = city;
    if(state) change.state = state;
    if(country) change.country = country;
    if(lat) change.lat = lat;
    if(lng) change.lgn = lng;
    if(name) change.name = name;
    if(description) change.description = description;
    if(price) change.price = price;

    await change.save();

    res.json(change)
})

//create review for pot
router.post('/:spotId/reviews', validateReview, requireAuth, async(req,res) =>{
    const { review, stars } = req.body
    const change = await Spot.findByPk(req.params.spotId)
    
    if(!change){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

        //check if user already has review
        const spotId = req.params.spotId
        const userId = req.user.id

        const userReview = await Review.findOne({
            where: {spotId: spotId, userId: userId}
        })
        if(userReview){
            res.statusCode = 403
            res.json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            })
        }
 

        const newReview = await Review.create({
            userId: userId,
            spotId: spotId,
            review: review,
            stars: stars,
        })
    

        res.json(newReview)
} )

module.exports = router;
const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const spot = require('../../db/models/spot');
const e = require('express');


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
router.get('/:spotId', async(req,res,next) => {

    const spots = await Spot.findByPk(req.params.spotId, {
        raw:true
    })
    
    
    if(!spots){
      const err = new Error("Spot couldn't be found");
      err.status = 404
      return next(err)
    }
    const reviews = await Review.findAll({
        where: {spotId: spots.id},
        attributes: ["stars", "review"],
        raw:true
    })
    
    let count = 0;
    let total = reviews.length
    reviews.forEach(rating =>{
        count += rating.stars
    })
    
    spots.numReviews = reviews.length;
    spots.avgStarRating = count / total;
    
   const img = await SpotImage.findAll({
    where: { preview: true, spotId: spots.id},
    attributes:["id", "url", "preview"]
   })

   spots.SpotImages = img;

    const owner = await User.findOne({
        where: {id: spots.ownerId},
        attributes: ["id","firstName","lastName"]
    })

    spots.Owner = owner 


    res.json(spots)
})

//edit spot
router.put('/:spotId', requireAuth, async(req, res)=> {
    
})

module.exports = router;
const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');



//get all of the current users's bookings

router.get("/current", requireAuth, async(req, res) => {
    const currUser = req.user.id

    const bookings = await Booking.findAll({
        where: {
            userId: currUser
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude:["description", "createdAt", "updatedAt"]
                }
            }
        ]
    })

    let userBookings = []

    //loop over bookings and covert to json in 1 loop
    for (let booking of bookings){

        const currBookings = booking.toJSON();

        //get preview image
        const previewImage = await SpotImage.findOne({
            where: {spotId: booking.Spot.id, preview: true}
        })

        if(!previewImage){
            currBookings.Spot.previewImage = "no preview image found"
        } else {
            currBookings.Spot.previewImage = previewImage.url
        }

        // console.log(currBookings)
        userBookings.push(currBookings)
    }



    // console.log(userBookings)

    res.json({Bookings: userBookings})
})


module.exports = router;
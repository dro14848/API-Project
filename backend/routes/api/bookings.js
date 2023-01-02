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
        attributes: ["id","spotId","userId","startDate","endDate","createdAt","updatedAt"],
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

//edit a booking
router.put('/:bookingId', requireAuth, async(req, res)=> {
    const { startDate, endDate} = req.body;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // const booking = await Booking.findByPk(req.params.bookingId)
    const booking = await Booking.findOne({
        where:{ 
            id: req.params.bookingId,
            userId: req.user.id
        }
    })

    if(!booking){
        res.statusCode = 404
        res.json({
            "message":"Booking couldn't be found",
            "statusCode": 404
        })
    }
    
    if(start >= end){
        res.statusCode = 400
        res.json({
            "message": "validation Error",
            "statusCode": 400,
            "errors": {
                "endDate":"endDate cannot be on or before startDate"
            }
        })
    }

    const newStart = new Date(booking.startDate).getTime();
    const newEnd = new Date(booking.endDate).getTime();

    // console.log(newStart, "===> ", newEnd)

    if(start <= Date.now() || newStart <= Date.now()){
        res.statusCode = 403
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }

    //check conflicts, same logic 
    if( start === newStart || start > newStart && start <=newEnd || end === newStart || end > newStart && end <= newEnd){
        res.statusCode = 403
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start Date conflicts with an existing booking",
                "endDate":"End date conflicts with an existing booking"
            }

    })
    }

    //update booking
    if(startDate) booking.startDate = startDate;
    if(endDate) booking.endDate = endDate

    await booking.save()

    res.json(booking)
})

//delete booking
router.delete('/:bookingId', requireAuth, async(req, res)=>{
    const booking = await Booking.findOne({
        where: {id: req.params.bookingId}
    })

    if(!booking){
        res.statusCode = 404;
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

        //check if user is owner of spot or booking
        const spot = await Spot.findOne({
            where: {id: booking.spotId}
        })
        

        if(req.user.id === booking.userId || req.user.id === spot.ownerId){
            const bookingDate = new Date(booking.startDate).getTime();
            if(bookingDate <= Date.now()){
                res.statusCode = 403
                res.json({
                    "message":"Bookings that have been started can't be deleted",
                    "statusCode": 403
                })
            }
            await booking.destroy();
            res.statusCode = 200;
            res.json({
                "message": "Successfully delete",
                "statusCode": 200
            })
        } else {
            res.statusCode = 403;
            res.json({
                "message":"Not Authorized",
                "statusCode": 403
            })
        }
})




module.exports = router;
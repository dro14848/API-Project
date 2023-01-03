const express = require('express');
const router = express.Router();
const { SpotImage, Spot, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');



//delete spot image

router.delete("/:imageId", requireAuth, async(req,res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);

    if(!spotImage){
        res.statusCode = 404;
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    const spot = await Spot.findOne({
        where: {
            ownerId: req.user.id,
            id: spotImage.spotId
        }
    })

    if(!spot){
        res.statusCode = 404;
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    await spotImage.destroy();
    res.statusCode = 200;
    res.json({
        "message":"Successfully Deleted",
        "statusCode": 200
    })
})


module.exports = router;
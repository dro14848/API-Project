const express = require('express');
const router = express.Router();
const { SpotImage, Sequelize } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');



//delete spot image

router.delete("/:imageId", requireAuth, async(req,res) => {
    const spotImg = await SpotImage.findByPk(req.params.imageId);

    if(!spotImg){
        res.statusCode = 404;
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    await spotImg.destroy();
    res.statusCode = 200;
    res.json({
        "message":"Successfully Deleted",
        "statusCode": 200
    })
})


module.exports = router;
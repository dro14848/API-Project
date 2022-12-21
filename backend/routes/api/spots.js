const express = require('express');
const router = express.Router();
const { Spot, User } = require('../../db/models');
const sequelize = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')


//get all spots
router.get('/', async(req, res) => {

})

const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

  
  const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a first name'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a last name'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  // Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;


      //unique email

      const validEmail = await User.findOne({where:{email}})

        if(validEmail) {
          res.status = 403;
          return res.json(
            {
              "message": "User already exists",
              "statusCode": 403,
              "errors": {
                "email": "User with that email already exists"
              }
            }
          )
        }
      //unique username
      const validUserName = await User.findOne({where:{username}})

        if(validUserName){
          res.status = 403;
          return res.json(
            {
              "message": "User already exists",
              "statusCode": 403,
              "errors": {
                "username": "User with that username already exists"
              }
            }
          )

        }
      const user = await User.signup({ email, username, password, firstName, lastName});
  
      await setTokenCookie(res, user);
  
      return res.json({
        user: user
      });
    }
  );

module.exports = router;

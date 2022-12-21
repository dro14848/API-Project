const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');


// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });
  
// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


// GET /api/restore-user

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;
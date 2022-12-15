const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');


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

module.exports = router;
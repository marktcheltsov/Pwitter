const router = require('express').Router();

const {
  getUsers,
  getUser,
  addFollowing, 
  deleteFollowing,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/follow/:id', addFollowing);
router.delete('/follow/:id',deleteFollowing);

const userRouter = router;
module.exports = userRouter;

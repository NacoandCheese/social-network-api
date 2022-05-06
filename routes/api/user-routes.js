const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  getAllUsers
} = require('../../controllers/user-controller');


// /api/Users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/Users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//add friend
router.route('/:id/friends/:friendsId').post(addFriend);

module.exports = router;
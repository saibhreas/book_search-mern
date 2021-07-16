const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// /api/users/ POST PUT
// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveBook);

// /api/users/login POST
router.route('/login').post(login);

// /api/users/me GET
router.route('/me').get(authMiddleware, getSingleUser);

// /api/users/books/:bookId DELETE
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

module.exports = router;

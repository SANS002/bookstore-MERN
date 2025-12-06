const router = require('express').Router();
const adminCtrl = require('../controllers/adminController');
const auth = require('../middlewares/auth');

router.get('/stats', auth('admin'), adminCtrl.getStats);
router.get('/users', auth('admin'), adminCtrl.getAllUsers);
router.get('/sellers', auth('admin'), adminCtrl.getAllSellers);
router.delete('/user/:id', auth('admin'), adminCtrl.deleteUser);
router.delete('/seller/:id', auth('admin'), adminCtrl.deleteSeller);
router.get('/books', auth('admin'), adminCtrl.getAllBooks);

module.exports = router;

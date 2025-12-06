const router = require('express').Router();
const bookCtrl = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBookById);
router.post('/', auth(['seller','admin']), upload.single('itemImage'), bookCtrl.addBook);
router.put('/:id', auth(['seller','admin']), upload.single('itemImage'), bookCtrl.updateBook);
router.delete('/:id', auth(['seller','admin']), bookCtrl.deleteBook);

module.exports = router;

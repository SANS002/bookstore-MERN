const router = require('express').Router();
const orderCtrl = require('../controllers/orderController');
const auth = require('../middlewares/auth');

router.post('/', auth('user'), orderCtrl.createOrder);
router.get('/myorders', auth('user'), orderCtrl.getUserOrders);
router.get('/', auth('admin'), orderCtrl.getAllOrders);
router.get('/seller', auth('seller'), orderCtrl.getSellerOrders);

module.exports = router;

const Order = require('../models/OrderSchema');
const Book = require('../models/BookSchema');

exports.createOrder = async (req, res) => {
  try {
    const { books, totalAmount, flatno, pincode, city, state } = req.body;
    const order = new Order({
      userId: req.user.id,
      userName: req.user.name || '',
      books,
      totalAmount,
      flatno, pincode, city, state
    });
    // optional: set sellerId for first book (basic)
    if (books && books.length) {
      const book = await Book.findById(books[0].bookId);
      if (book) {
        order.sellerId = book.sellerId;
        order.sellerName = book.sellerName;
      }
    }
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// seller-specific: get orders that contain seller's books
exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const orders = await Order.find({ 'books.bookId': { $exists: true } }).sort({ createdAt: -1 });
    // filter where any book belongs to seller — basic approach by checking book.sellerId requires population; do simple filter:
    const filtered = [];
    for (const o of orders) {
      // get first book's seller via Book model
      let contains = false;
      for (const b of o.books) {
        // to avoid extra DB calls we approximate: if order.sellerId equals sellerId
        if (o.sellerId && o.sellerId.toString() === sellerId) {
          contains = true;
          break;
        }
      }
      if (contains) filtered.push(o);
    }
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

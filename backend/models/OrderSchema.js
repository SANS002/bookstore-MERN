const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  sellerName: String,
  books: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    title: String,
    price: String,
    qty: { type: Number, default: 1 }
  }],
  totalAmount: String,
  flatno: String,
  pincode: String,
  city: String,
  state: String,
  bookingDate: { type: String, default: () => new Date().toLocaleDateString('hi-IN') },
  deliveryDate: { type: String, default: () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  } },
  status: { type: String, default: 'placed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

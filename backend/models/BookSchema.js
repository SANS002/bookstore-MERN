const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type:String, required:true },
  author: { type:String, required:true },
  genre: String,
  price: String,
  itemImage: String,
  description: String,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  sellerName: String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

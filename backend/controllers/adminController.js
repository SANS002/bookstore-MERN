const User = require('../models/UserSchema');
const Seller = require('../models/SellerSchema');
const Book = require('../models/BookSchema');

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const sellers = await Seller.countDocuments();
    const books = await Book.countDocuments();
    res.json({ users, sellers, books });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().select('-password').sort({ createdAt: -1 });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Seller deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

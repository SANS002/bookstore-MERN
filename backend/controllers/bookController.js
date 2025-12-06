const Book = require('../models/BookSchema');

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, price, description } = req.body;
    // const itemImage = req.file ? `uploads/${req.file.filename}` : '';
    // addBook
    const itemImage = req.file ? req.file.filename : '';
    const sellerId = req.user.id;
    const sellerName = req.user.name || '';

    const book = new Book({ title, author, genre, price, description, itemImage, sellerId, sellerName });
    await book.save();
    res.json({ book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    // simple search & filter
    const { q, genre } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (q) filter.title = new RegExp(q, 'i');

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({ msg: 'Not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const b = await Book.findById(req.params.id);
    if (!b) return res.status(404).json({ msg: 'Not found' });
    // only seller who created it (or admin) can edit
    if (req.user.role !== 'admin' && (b.sellerId?.toString() !== req.user.id)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    const { title, author, genre, price, description } = req.body;
    // if (req.file) b.itemImage = `uploads/${req.file.filename}`;
    if (req.file) b.itemImage = req.file.filename;
    if (title) b.title = title;
    if (author) b.author = author;
    if (genre) b.genre = genre;
    if (price) b.price = price;
    if (description) b.description = description;
    await b.save();
    res.json({ book: b });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const b = await Book.findById(req.params.id);
    if (!b) return res.status(404).json({ msg: 'Not found' });
    // only seller who created it (or admin) can delete
    if (req.user.role !== 'admin' && (b.sellerId?.toString() !== req.user.id)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

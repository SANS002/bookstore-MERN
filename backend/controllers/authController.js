const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const Seller = require('../models/SellerSchema');
const Admin = require('../models/AdminSchema');

const tokenFor = (user) => jwt.sign({ id: user._id, role: user.role || 'user', name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // prevent duplicate email across collections: just check Users collection (we create user roles inside User model)
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role || 'user' });
    await user.save();
    const token = tokenFor(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // First try Users collection (which has all roles). If not found, fallback to Seller/Admin (compat)
    let user = await User.findOne({ email });
    if (!user) user = await Seller.findOne({ email }) || await Admin.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    // determine role
    const role = user.role || (await Seller.findById(user._id) ? 'seller' : (await Admin.findById(user._id) ? 'admin' : 'user'));
    const token = jwt.sign({ id: user._id, role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role }, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

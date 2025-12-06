const jwt = require('jsonwebtoken');

const auth = (requiredRoles) => {
  // requiredRoles may be a string or array of strings, or undefined (allow any authenticated)
  return (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ msg: 'No token provided' });

      const token = header.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requiredRoles) {
        const allowed = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        if (!allowed.includes(decoded.role)) {
          return res.status(403).json({ msg: 'Forbidden: insufficient role' });
        }
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid token' });
    }
  };
};

module.exports = auth;

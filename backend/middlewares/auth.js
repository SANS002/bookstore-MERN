// const jwt = require('jsonwebtoken');

// const auth = (requiredRoles) => {
//   // requiredRoles may be a string or array of strings, or undefined (allow any authenticated)
//   return (req, res, next) => {
//     try {
//       const header = req.headers.authorization;
//       if (!header) return res.status(401).json({ msg: 'No token provided' });

//       const token = header.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;

//       if (requiredRoles) {
//         const allowed = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
//         if (!allowed.includes(decoded.role)) {
//           return res.status(403).json({ msg: 'Forbidden: insufficient role' });
//         }
//       }

//       next();
//     } catch (err) {
//       res.status(401).json({ msg: 'Invalid token' });
//     }
//   };
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema'); // optional if you want DB check

const auth = (requiredRoles, allowedEmails) => {
  // requiredRoles: string | array | undefined
  // allowedEmails: string | array | undefined
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ msg: 'No token provided' });

      const token = header.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check role if required
      if (requiredRoles) {
        const allowedRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        if (!allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ msg: 'Forbidden: insufficient role' });
        }
      }

      // Check email if provided
      if (allowedEmails) {
        const allowedList = Array.isArray(allowedEmails) ? allowedEmails : [allowedEmails];
        if (!allowedList.includes(decoded.email)) {
          return res.status(403).json({ msg: 'Forbidden: email not allowed' });
        }
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid token' });
    }
  };
};

module.exports = auth;

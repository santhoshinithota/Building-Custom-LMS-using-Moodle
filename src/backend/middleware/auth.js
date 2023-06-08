const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const Org = require('../models/orgSchema')

// Middleware to verify JWT token
const verifyToken = async (req, res,next) => {
  const v_token = req.cookies["token"];

  if (!v_token) {
    return res.status(401).send({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = jwt.verify(v_token, `${process.env.JWT_SECRET}`);
    if (role==='teacher') {
      req.user = User.findOne({email: decodedToken.email})
    }
    else {
      req.user = Org.findOne({email: decodedToken.email})
    }
    req.role = role
    next()
  } catch (err) {
    // If the token is invalid, return an error message
    res.status(401).json({ message: 'Invalid token' });
  }
};

  // router.get('/logout', (req, res) => {
  //   res.clearCookie('token');
  //   res.json({ message: 'User logged out' });
  // });

module.exports = verifyToken;
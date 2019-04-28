import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    try {
      const err = new Error('Not authenticated.');
      err.statusCode = 401;
      throw err;
    } catch (err) {
      return res.status(401).json({
        status: 401,
        error: err,
      });
    }
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      status: 401,
      error: 'Not Authenticated!',
    });
  }
  req.userId = decodedToken.userId;
  return next();
};

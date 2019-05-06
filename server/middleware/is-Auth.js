import jwt from 'jsonwebtoken';
import db from '../model/db';

class Auth {
  /**
   * Generate token based on payload.
   *
   * @param {*} id
   * @param {*} email
   * @param {*} isAdmin
   */
  static generateToken(id, email, isAdmin) {
    const token = jwt.sign({
      id,
      email,
      isAdmin,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    });

    return token;
  }

  /**
   * Verifies user provided token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if token is provided
    if (!token) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, you have to login',
        });
    }

    try {
      // verify user provided token against existing token
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);

      const user = db.User.find(existUser => existUser.id === decoded.id);

      // check for valid app users
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: 'The token you provided is invalid',
        });
      }

      // get user id
      req.user = decoded;

      return next();
    } catch (errors) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
  }
}

export default Auth;

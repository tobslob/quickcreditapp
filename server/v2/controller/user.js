import moment from 'moment';
import db from '../db/index';
import validate from '../../helper/validation';
import Helper from '../../helper/helper';
import Auth from '../../middleware/is-Auth';

class User {
  /**
       * signup a user in to the app
       * @param {*} req
       * @param {*} res
       */
  static async createUser(req, res) {
    const { error } = validate.validateUser(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const hashpassword = Helper.hashPassword(req.body.password);

    const text = `INSERT INTO 
      users(email, firstName, lastName, address, password, status, isAdmin, createdOn, modifiedOn) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      returning id, email, firstName, lastName, address, status, isAdmin, createdOn, modifiedOn`;
    const values = [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      req.body.address,
      hashpassword,
      'pending',
      false,
      moment(new Date()),
      moment(new Date()),
    ];
    try {
      const { rows } = await db.query(text, values);
      const token = Auth.generateToken(
        rows[0].id,
        rows[0].email,
        rows[0].isAdmin,
      );

      return res.status(201).json({
        status: 201,
        token,
        data: rows[0],
      });
    } catch (errors) {
      if (errors.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'User already exist',
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
       * log a user in to the app
       * @param {*} req
       * @param {*} res
       */
  static async loginUser(req, res) {
    const { error } = validate.validateLogin(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const queryString = 'SELECT * FROM users WHERE email = $1';

    try {
      // Select all user record where email is equal db email
      const { rows } = await db.query(queryString, [req.body.email]);

      // check if user exist in database
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User not Found',
        });
      }

      // compare user provided password against db
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res
          .status(401)
          .json({
            status: 401,
            error: 'Email/Password incorrect',
          });
      }

      // generate token
      const token = Auth.generateToken(
        rows[0].id,
        rows[0].email,
        rows[0].isadmin,
      );

      // check if user is an admin
      let access = false;
      if (rows[0].isadmin) {
        access = true;
      }

      // return success message
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'Logged in successfully',
          user: {
            access,
          },
          token,
        }],
      });
    } catch (errors) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
     * GET all user
     * @param {*} req
     * @param {*} res
     */
  static async getUsers(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'users retrieve successfully',
          rows,
          rowCount,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
     * GET A user
     * @param {*} req
     * @param {*} res
     */
  static async getUser(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          message: `users with id:${rows[0].id} retrieve successfully`,
          rows,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
       * PATCH A user
       * @param {*} req
       * @param {*} res
       */
  static async patchUser(req, res) {
    const { error } = validate.patchUser(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const updateQuery = `UPDATE users
      SET firstName=$1, lastName=$2, address=$3, modifiedOn=$4
      WHERE id=$5 returning *`;

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.address,
      moment(new Date()),
      req.params.id,
    ];

    try {
      const { rows } = await db.query(updateQuery, values);
      return res.status(202).json({
        status: 202,
        data: [
          {
            message: `users with id:${rows[0].id} has been updated`,
            rows,
          },
        ],
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
 * DELETE A user
 * @param {*} req
 * @param {*} res
 */
  static async deleteUser(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          message: `users with id:${rows[0].id} has been deleted`,
          rows,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default User;

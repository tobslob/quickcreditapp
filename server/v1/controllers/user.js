/* eslint-disable radix */
import moment from 'moment';
import models from '../model/db';
import validate from '../../helper/validation';
import Helper from '../../helper/helper';
import isAuth from '../../middleware/is-Auth';

class User {
  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static createUser(req, res) {
    const { error } = validate.validateUser(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const hashpassword = Helper.hashPassword(req.body.password);
    const createUser = {
      id: models.User.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashpassword,
      status: 'pending',
      isAdmin: false,
      createdOn: moment(new Date()),
      modifiedOn: moment(new Date()),
    };
    try {
      const user = models.User.find(
        existUser => existUser.email === req.body.email,
      );
      if (user) {
        return res.status(409).json({
          status: 409,
          error: 'user already exist',
        });
      }
      models.User.push(createUser);

      const finUser = models.User.find(aUser => aUser.id === createUser.id);

      const post = {
        id: finUser.id,
        'first name': finUser.firstName,
        'last name': finUser.lastName,
        address: finUser.address,
        email: finUser.email,
        status: finUser.status,
        'created on': finUser.createdOn,
      };

      const token = isAuth.generateToken(createUser.id, createUser.email, createUser.isAdmin);
      return res.status(201).json({
        status: 201,
        token,
        data: post,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }

  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static loginUser(req, res) {
    const { error } = validate.validateLogin(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const users = models.User;
    try {
      const user = users.find(specUser => specUser.email === req.body.email);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'no user with such email',
        });
      }
      if (!Helper.comparePassword(user.password, req.body.password)) {
        return res.status(401).json({
          status: 401,
          error: 'Email/Password incorrect',
        });
      }
      const token = isAuth.generateToken(user.id, user.email, user.isAdmin);
      return res.status(200).json({
        status: 200,
        token,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }

  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static getUsers(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    try {
      const users = models.User;
      return res.status(200).json({
        status: 200,
        data: users,
        rowCount: users.length,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }

  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static getUser(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    // eslint-disable-next-line radix
    const requestId = parseInt(req.params.id);
    try {
      const users = models.User;
      const user = users.find(oneUser => oneUser.id === requestId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }

  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static patchUser(req, res) {
    const requestId = parseInt(req.params.id);
    const users = models.User;
    try {
      const user = users.find(oneUser => oneUser.id === requestId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }
      const { error } = validate.patchUser(req.body);
      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message,
        });
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.address = req.body.address;
      user.modifiedOn = moment(new Date());

      const post = {
        id: user.id,
        'first name': user.firstName,
        'last name': user.lastName,
        address: user.address,
        email: user.email,
        status: user.status,
        'created on': user.createdOn,
      };


      return res.status(202).json({
        status: 202,
        data: post,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }

  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static deleteUser(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    const requestId = parseInt(req.params.id);
    try {
      const users = models.User;
      const user = users.find(oneUser => oneUser.id === requestId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }
      const index = users.indexOf(user);
      users.splice(index, 1);
      return res.status(200).json({
        status: 200,
        message: `user with id:${requestId} has been deleted`,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }
}

export default User;

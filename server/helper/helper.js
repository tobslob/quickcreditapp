import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import db from '../model/db';

dotenv.config();

const Helper = {
  /**
     * Hash Password Method
     * @param {string} Password
     * @returns {string} returns hashed password
     */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  /**
     * compare Password
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * trim input whitespaces
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  trimmer(req, res, next) {
    const { body } = req;
    if (body) {
      const trimmed = {};

      Object.keys(body).forEach((key) => {
        const value = body[key];
        Object.assign(trimmed, { [key]: value.trim() });
      });
      req.body = trimmed;
    }

    next();
  },


  /** *
 * send mail
 * @param {*} req
 * @param {*} res
 */
  mailer(req, res, next) {
    const loan = db.Loans.find(aLoan => aLoan.id === req.params.id);
    if (!loan) {
      return res.status(404).json({
        status: 404,
        error: 'Loan Not Found',
      });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_SECRET,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const HelperOptions = {
      from: '"Quick Credit" <quickcreditapp@gmail.com',
      to: loan.user,
      subject: `Your loan request has been ${req.body.status}`,
      html: `We are pleased to inform you that your loan has just been ${req.body.status}. <a href = "https://quickcreditapp.herokuapp.com/sign-in.html">Login</a>\n\nThank you!`,
    };

    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return res.status(400).json({
          status: 400,
          error,
        });
      }
      return res.status(200).json({
        status: 200,
        info,
      });
    });
    return next();
  },
};

export default Helper;

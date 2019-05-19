import moment from 'moment';
import nodemailer from 'nodemailer';
import models from '../model/db';
import validate from '../../helper/validation';
import Helper from '../../helper/helper';
import isAuth from '../middleware/is-Auth';


class Resetpassword {
  /** *
   * send mail
   * @param {*} req
   * @param {*} res
   */
  static mailer(req, res) {
    const { error } = validate.validateMailer(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    try {
      const user = models.User.find(aUser => aUser.email === req.body.email);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'No account with that email address exists!',
        });
      }

      const token = isAuth.generatepwToken(user.id, user.email, user.password);

      const url = 'https://quickcreditapp.herokuapp.com/reset-password.html';

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
        to: req.body.email,
        subject: 'Forgot your password? We can help. ',
        html: `Hi ${user.firstName} <br><br> Forgot your password? No worries. we have got you covered. Click the link below to reset your password <br><br> <a href = "${url}/${user.id}/${token}">Reset</a>`,
      };

      transporter.sendMail(HelperOptions, (err, { accepted }) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            err,
          });
        }
        return res.status(200).json({
          status: 200,
          accepted,
        });
      });
      return 'success!';
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }


  /** *
       * password reset
       * @param {*} req
       * @param {*} res
       */
  static resetPassword(req, res) {
    const { error } = validate.validatePassword(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    try {
      const user = models.User.find(aUser => aUser.email === req.user.email);

      const hashpassword = Helper.hashPassword(req.body.password);
      if (req.body.password === req.body.passwordConf) {
        user.password = hashpassword;
        user.modifiedOn = moment(new Date());

        return res.status(202).json({
          status: 202,
          data: [
            {
              message: 'password reset successfully',
              user,
            },
          ],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Passwords must match',
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }
}

export default Resetpassword;

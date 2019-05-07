import moment from 'moment';
import nodemailer from 'nodemailer';
import models from '../model/db';
import validate from '../helper/validation';
import Helper from '../helper/helper';

class passwordReset {
  /** *
 * send mail
 * @param {*} req
 * @param {*} res
 */
  static mailer(req, res, next) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'quickcreditapp@gmail.com',
        pass: 'Kazeem27',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const HelperOptions = {
      from: '"Quick Credit" <quickcreditapp@gmail.com',
      to: req.body.email,
      subject: 'Password Reset Successfully!',
      text: 'You have successfully reset your password, cheers :-) Please if you do not authorize this, please contact us asap',
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
  }

  /** *
     * password reset
     * @param {*} req
     * @param {*} res
     */
  static resetPassword(req, res, next) {
    const { error } = validate.validatePassword(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const user = models.User.find(aUser => aUser.email === req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'No account with that email address exists!',
      });
    }

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
    return next();
  }
}

export default passwordReset;

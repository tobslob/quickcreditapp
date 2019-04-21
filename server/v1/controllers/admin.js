import moment from 'moment';
import models from '../model/db';
import validate from '../../helper/validation';

class adminController {
  /**
     *
     * @param {req} object
     * @param {res} object
     */
  static verifyUser(req, res) {
    const { error } = validate.validateVerify(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }
    const requestEmail = req.params.email;
    const user = models.User.find(oneUser => oneUser.email === requestEmail);
    if (!user) {
      return res.status(404).json({
        status: '404',
        message: 'user not exist',
      });
    }
    user.status = req.body.status;
    user.modifiedOn = (moment(new Date()));
    return res.status(202).json({
      status: '201',
      data: user,
    });
  }
}

export default adminController;

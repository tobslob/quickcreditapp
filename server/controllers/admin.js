import moment from 'moment';
import models from '../model/db';
import validate from '../helper/validation';

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
        status: 404,
        message: 'user not exist',
      });
    }
    user.status = req.body.status;
    user.modifiedOn = (moment(new Date()));
    return res.status(202).json({
      status: 201,
      data: user,
    });
  }

  /**
 *@param {req} object
 *@param {res} object
 */
  static allLoan(req, res) {
    const loans = models.Loans;
    const rowCount = loans.length;
    if (!loans) {
      return res.status(500).json({
        status: 500,
        message: 'internal server error',
      });
    }
    return res.status(200).json({
      status: 200,
      data: loans,
      rowCount,
    });
  }


  /**
 *@param {req} object
 *@param {res} object
 */
  static oneLoan(req, res) {
    const loans = models.Loans;
    const loan = loans.find(aLoan => aLoan.id === req.params.id);
    if (!loan) {
      return res.status(500).json({
        status: 404,
        message: 'Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  /**
 *@param {req} object
 *@param {res} object c
 */
  // eslint-disable-next-line consistent-return
  static loanPayment(req, res, next) {
    const { status, repaid } = req.query;
    let paymentFilter;
    const loans = models.Loans;
    if (status && repaid) {
      const boolRepaid = JSON.parse(repaid);
      paymentFilter = loans.filter(loan => loan.status === status.toLowerCase()
        && loan.repaid === boolRepaid);
      if (paymentFilter.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Not Found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: paymentFilter,
      });
    }
    next();
  }
}

export default adminController;

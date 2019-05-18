/* eslint-disable radix */
import moment from 'moment';
import models from '../model/db';
import validate from '../../helper/validation';


class Admin {
  /**
     *
     * @param {req} object
     * @param {res} object
     */
  static verifyUser(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    const { error } = validate.validateVerify(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const requestEmail = req.params.email;

    try {
      const user = models.User.find(oneUser => oneUser.email === requestEmail);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'user not exist',
        });
      }
      user.status = req.body.status;
      user.modifiedOn = (moment(new Date()));
      return res.status(202).json({
        status: 202,
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong',
      });
    }
  }

  /**
 *@param {req} object
 *@param {res} object
 */
  static allLoan(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }

    const loans = models.Loans;
    try {
      const rowCount = loans.length;
      return res.status(200).json({
        status: 200,
        data: loans,
        rowCount,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }


  /**
 *@param {req} object
 *@param {res} object
 */
  static oneLoan(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }

    const loans = models.Loans;

    try {
      const loan = loans.find(aLoan => aLoan.id === parseInt(req.params.id));
      if (!loan) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: loan,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }

  /**
 *@param {req} object
 *@param {res} object c
 */
  static loanPayment(req, res, next) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    const { status, repaid } = req.query;
    let paymentFilter;
    const loans = models.Loans;
    try {
      if (status && repaid) {
        const boolRepaid = JSON.parse(repaid);
        paymentFilter = loans.filter(loan => loan.status === status.toLowerCase()
          && loan.repaid === boolRepaid);
        if (paymentFilter.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'Not Found',
          });
        }
        return res.status(200).json({
          status: 200,
          data: paymentFilter,
        });
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }

  /**
 *@param {req} object
 *@param {res} object
 */
  static approveReject(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
    }
    const loans = models.Loans;
    const requestId = parseInt(req.params.id);
    try {
      const loan = loans.find(aLoan => aLoan.id === requestId);
      if (loan.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
        });
      }
      const { error } = validate.loanApproveValidate(req.body);
      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message,
        });
      }
      loan.status = req.body.status;
      loan.modifiedOn = moment(new Date());
      return res.status(200).json({
        status: 200,
        data: loan,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'something went wromg',
      });
    }
  }

  /**
 *@param {req} object
 *@param {res} object
 */
  static loanRepayforClient(req, res) {
    const { error } = validate.validateLoanRepayment(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    try {
      const paidAmount = parseFloat(req.body.paidAmount);
      // find a loan in Loans data
      const loan = models.Loans.find(aloan => aloan.id === parseInt(req.params.id));
      if (!loan) {
        return res.status(404).json({
          status: 404,
          message: 'No such loan found',
        });
      }

      if (paidAmount > loan.balance) {
        return res.status(400).json({
          status: 400,
          error: 'you can not pay more than your debt!',
        });
      }

      const balance = loan.balance - paidAmount;
      const paid = {
        id: models.loanRepayment.length + 1,
        loanId: req.params.id,
        createdOn: moment(new Date()),
        amount: loan.amount, // loan amount
        monthlyInstallment: loan.paymentInstallment, // what the user is expected to pay
        paidAmount,
        balance,
      };
      // update balance in loan
      loan.balance = balance;
      if (loan.balance <= 0) {
        loan.repaid = true;
      }
      models.loanRepayment.push(paid);
      return res.status(200).json({
        status: 200,
        data: paid,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'something went wrong',
      });
    }
  }
}

export default Admin;

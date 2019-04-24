import uuidv4 from 'uuid/v4';
import moment from 'moment';
import models from '../model/db';
import validate from '../helper/validation';

class Money {
  /** *
     * @param{req} object
     * @param{res} object
     */
  static loan(req, res) {
    const { error } = validate.validateLoan(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }

    const amount = parseFloat(req.body.amount);
    const tenor = parseFloat(req.body.tenor);
    const interest = (0.05 * amount);
    const paymentInstallment = ((amount + interest) / tenor);

    const applyLoan = {
      id: uuidv4(),
      user: models.User[0].email,
      createdOn: moment(new Date()),
      status: 'pending',
      repaid: false,
      tenor,
      amount,
      paymentInstallment,
      balance: (amount + interest),
      interest,
      modifiedOn: moment(new Date()),
    };
    const existLoan = models.Loans.filter(email => email.user === models.User[0].email);
    for (let i = 0; i < existLoan.length; i += 1) {
      if (existLoan[i].repaid === false) {
        return res.status(402).json({
          status: 402,
          message: 'you have an outstanding loan',
        });
      }
    }
    models.Loans.push(applyLoan);
    return res.status(201).json({
      status: 201,
      data: applyLoan,
    });
  }

  /** *
     * loan repayment history
     * @param{req}object
     * @param{res}object
     */
  static repaymentHistory(req, res) {
    const requestId = req.params.id;
    const loans = models.Loans;
    const loan = loans.find(oneLoan => oneLoan.id === requestId);
    if (!loan) {
      return res.status('404').json({
        status: 404,
        message: 'user not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }
}

export default Money;

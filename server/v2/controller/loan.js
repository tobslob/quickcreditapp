import db from '../db/index';
import validate from '../../helper/validation';

class Loan {
  /** *
       * @param{req} object
       * @param{res} object
       */
  static async postLoan(req, res) {
    const { error } = validate.validateLoan(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    try {
      const amount = parseFloat(req.body.amount);
      const tenor = parseFloat(req.body.tenor);
      const interest = (0.05 * amount);
      const paymentInstallment = ((amount + interest) / tenor);
      const { email } = req.user;

      const queryString = `SELECT * FROM users where email = '${email}'`;
      const myRes = await db.query(queryString);

      if (myRes.rows[0].status === 'pending' || myRes.rows[0].status === 'unverified') {
        return res.status(422).json({
          status: 422,
          error: 'wait for verification and re-apply',
        });
      }

      const text = `INSERT INTO 
    loan(users, createdOn, status, repaid, tenor, amount, paymentInstallment, balance, interest) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    returning *`;

      const values = [
        email,
        new Date(),
        'pending',
        false,
        tenor,
        amount,
        paymentInstallment,
        (amount + interest),
        interest,
      ];

      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: [
          {
            message: 'your loan request received, wait for approval',
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


  /** *
       * loan repayment history
       * @param{req}object
       * @param{res}object
       */
  static async repaymentHistory(req, res) {
    const queryString = 'SELECT * FROM loan WHERE id = $1';
    try {
      const { rows } = await db.query(queryString, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
        });
      }
      if (req.user.email === rows[0].users || req.user.isAdmin === true) {
        return res.status(200).json({
          status: 200,
          data: [{
            message: `loan with id:${rows[0].id} retrieve successfully`,
            repaid: rows[0].repaid,
            rows,
          }],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Hmmm...you do not have access',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }


  //   /**
  //  * DELETE A Loan
  //  * @param {*} req
  //  * @param {*} res
  //  */
  //   static async deleteLoan(req, res) {
  //     const queryString = 'SELECT * FROM loan WHERE id = $1';
  //     try {
  //       const { rows } = await db.query(queryString, [req.params.id]);
  //       if (!rows[0]) {
  //         return res.status(404).json({
  //           status: 404,
  //           error: 'Not Found',
  //         });
  //       }
  //       if ((req.user.email === rows[0].users || req.user.isAdmin === true)
  //         && (rows[0].repaid === true || rows[0].status === 'pending')) {
  //         console.log(rows[0].repaid);
  //         const deleteQuery = 'DELETE FROM loan WHERE id=$1 returning *';

//         const { resRow } = await db.query(deleteQuery, [req.params.id]);
//         if (!resRow.rows[0]) {
//           return res.status(404).json({
//             status: 404,
//             error: 'Not Found',
//           });
//         }
//         return res.status(200).json({
//           status: 200,
//           data: [{
//             message: `loan with id:${rows[0].id} has been deleted`,
//             rows,
//           }],
//         });
//       }
//       return res.status(403).json({
//         status: 403,
//         error: 'you are not authorized to delete loan',
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: 400,
//         error: 'Something went wrong, try again',
//       });
//     }
//   }
}

export default Loan;

import models from '../model/db';
import validate from '../../helper/validation';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

class Money {

    /***
     * @param{req} object
     * @param{res} object
     */
    static loan(req, res) {
        const { error } = validate.validateLoan(req.body);
        if (error) return res.status(422).json({
            status: 422,
            message: error.details[0].message
        });

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
            balance: (amount+interest),
            interest,
        };
        const existLoan = models.Loans.filter(email => email.user === models.User[0].email);
        for (let i = 0; i < existLoan.length; i++) {
            if (existLoan[i].repaid === false) {
                return res.status(402).json({
                    status: '402',
                    message: 'you have an outstanding loan'
                });
            }
        }
        models.Loans.push(applyLoan);
        return res.status(201).json({
            status: '201',
            data: applyLoan
        });
    }
    
}

export default Money;

import express from 'express';
import loanController from '../controllers/loan';
import isAuth from '../../middleware/is-Auth';

const router = express.Router();

// Create a loan application
router.post('/loans', isAuth.verifyToken, loanController.loan);

// View loan repayment history
router.get('/loans/:id/repayment', isAuth.verifyToken, loanController.repaymentHistory);

module.exports = router;

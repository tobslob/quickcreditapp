import express from 'express';
import loanController from '../controllers/loan';

const router = express.Router();

// Create a loan application
router.post('/loans', loanController.loan);

// View loan repayment history
router.get('/loans/:id/repayment', loanController.repaymentHistory);

module.exports = router;

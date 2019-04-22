import express from 'express';
import loanController from '../controllers/loan';

const router = express.Router();

// apply loan route
router.post('/loan', loanController.loan);

// apply loan route
router.get('/loan/:id/repayments', loanController.repaymentHistory);

module.exports = router;

import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

// Admin can mark a client as verified route
router.patch('/users/:email/verify', adminController.verifyUser);

// Admin can view all loan route
router.get('/loans',
  adminController.loanPayment,
  adminController.allLoan);

// Admin can view a loan route
router.get('/loans/:id', adminController.oneLoan);

// Admin can view a loan route
router.patch('/loans/:id', adminController.approveReject);

// Admin can create a loan repayment record
router.post('/loans/:id', adminController.loanRepayforClient);

export default router;

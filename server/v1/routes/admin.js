import express from 'express';
import adminController from '../controllers/admin';
import Helper from '../../helper/helper';
import isAuth from '../../middleware/is-Auth';

const router = express.Router();

// Admin can mark a client as verified route
router.patch('/users/:email/verify', isAuth.verifyToken, adminController.verifyUser);

// Admin can view all loan route
router.get('/loans', isAuth.verifyToken,
  adminController.loanPayment,
  adminController.allLoan);

// Admin can view a loan route
router.get('/loans/:id', isAuth.verifyToken, adminController.oneLoan);

// Admin can approve or reject a loan
router.patch('/loans/:id', isAuth.verifyToken, Helper.trimmer, Helper.mailer, adminController.approveReject);

// Admin can create a loan repayment record
router.post('/loans/:id/repayment', isAuth.verifyToken, adminController.loanRepayforClient);

export default router;

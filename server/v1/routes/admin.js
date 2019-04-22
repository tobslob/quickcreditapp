import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

// Admin can mark a client as verified route
router.patch('/users/:email/verify', adminController.verifyUser);

// Admin can view all loan route
router.get('/loans', adminController.allLoan);

// Admin can view a loan route
router.get('/loans/:id', adminController.oneLoan);

// Admin can view all not fully paid loan route
router.get('/loans/', adminController.notFullyPaidLoan);

export default router;

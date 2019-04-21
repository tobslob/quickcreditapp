import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

router.patch('/users/:email/verify', adminController.verifyUser);

export default router;

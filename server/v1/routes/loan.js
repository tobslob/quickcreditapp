import express from 'express';
import loanController from '../controllers/loan';

const router = express.Router();

// apply loan route
router.post('/loan', loanController.loan);

module.exports = router;
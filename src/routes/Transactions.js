import express from 'express';
import Transactions from '../controllers/transactions';

const router = express.Router();

router.post('/acquire-credits', Transactions.acquireCredits);

export default router;

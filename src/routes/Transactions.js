import express from 'express';
import Transactions from '../controllers/Transactions';

const router = express.Router();

router.get('/', (req, res, next) => {
  Transactions.getAll(req, res);
});

router.post('/adquirir-creditos', (req, res, next) => {
  Transactions.adquirir_creditos(req, res);
});

export default router;

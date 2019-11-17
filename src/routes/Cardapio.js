import express from 'express';
import Cardapio from '../controllers/Cardapio';

const router = express.Router();

router.get('/', (req, res, next) => {
  Cardapio.recuperar(req, res);
});

router.post('/', (req, res, next) => {
  Cardapio.adicionar(req, res);
});

router.put('/', (req, res, next) => {
  Cardapio.alterar(req, res);
});

router.delete('/', (req, res, next) => {
  Cardapio.remover(req, res);
});

export default router;

import express from 'express';
import Ingredientes from '../controllers/Ingredientes';

const router = express.Router();

router.get('/', (req, res, next) => {
  Ingredientes.recuperar(req, res);
});

router.post('/', (req, res, next) => {
  Ingredientes.adicionar(req, res);
});

router.put('/', (req, res, next) => {
  Ingredientes.alterar(req, res);
});

router.delete('/', (req, res, next) => {
  Ingredientes.remover(req, res);
});

export default router;

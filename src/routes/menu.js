import express from 'express';
import Menu from '../controllers/menu';

const router = express.Router();

router.get('/', Menu.get);

router.post('/', Menu.add);

router.put('/:id', Menu.update);

router.delete('/:id', Menu.remove);

export default router;

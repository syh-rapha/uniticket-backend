import express from 'express';
import Ingredients from '../controllers/ingredients';

const router = express.Router();

router.get('/', Ingredients.get);

router.post('/', Ingredients.add);

router.put('/', Ingredients.update);

router.delete('/', Ingredients.remove);

export default router;

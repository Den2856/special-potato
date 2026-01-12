import express from 'express';
import { getDrinks, addDrink } from '../controllers/drinkController';

const router = express.Router();

router.get('/drinks', getDrinks);
router.post('/drinks', addDrink);

export default router;

import express from 'express';
import { getPizzas, addPizza } from '../controllers/pizzaController';

const router = express.Router();

router.get('/pizzas', getPizzas);
router.post('/pizzas', addPizza);

export default router;

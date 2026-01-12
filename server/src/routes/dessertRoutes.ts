import express from 'express';
import { getDesserts, addDessert } from '../controllers/dessertController';

const router = express.Router();

router.get('/desserts', getDesserts);
router.post('/desserts', addDessert);

export default router;

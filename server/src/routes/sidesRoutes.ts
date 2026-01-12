import express from 'express';
import { getSides, addSides } from '../controllers/sidesController';

const router = express.Router();

router.get('/sides', getSides);
router.post('/sides', addSides);

export default router;

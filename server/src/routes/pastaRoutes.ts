import express from 'express';
import { getPastas, addPastas } from '../controllers/pastaController';

const router = express.Router();

router.get('/pasta', getPastas);
router.post('/pasta', addPastas);

export default router;

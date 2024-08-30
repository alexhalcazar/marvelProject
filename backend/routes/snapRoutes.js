import express from 'express';
import { searchCard } from '../controllers/snapController.js';

const router = express.Router();

router.get('/find', searchCard);

export default router;

import express from 'express';
import { searchCard, getRandomCards } from '../controllers/snapController.js';

const router = express.Router();
router.route('/cards').get(searchCard).post(searchCard);
router.get('/cards/random', getRandomCards);
export default router;

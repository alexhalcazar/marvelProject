import express from 'express';
import { searchCard } from '../controllers/snapController.js';

const router = express.Router();
router.route('/find').get(searchCard).post(searchCard);

export default router;
